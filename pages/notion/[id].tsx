import { GetServerSideProps } from 'next';
import { getPageContent } from '@/lib/notion';
import 'react-notion-x/src/styles.css'; // react-notion-x 스타일 시트 (필요하다면 유지)
import React from 'react'; // React 임포트

import { NotionBlockRenderer } from '@/components/notion/notionBlocks'; // 경로 확인

type NotionTagColor = 'default' | 'gray' | 'brown' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'red';

const notionColorToRGBA: Record<NotionTagColor, string> = {
    'default': 'rgba(238, 238, 238, 0.8)',
    'gray': 'rgba(224, 224, 224, 0.8)',
    'brown': 'rgba(237, 224, 218, 0.8)',
    'orange': 'rgba(250, 229, 211, 0.8)',
    'yellow': 'rgba(251, 243, 219, 0.8)',
    'green': 'rgba(221, 237, 234, 0.8)',
    'blue': 'rgba(221, 235, 241, 0.8)',
    'purple': 'rgba(234, 228, 242, 0.8)',
    'pink': 'rgba(244, 223, 235, 0.8)',
    'red': 'rgba(251, 228, 228, 0.8)',
};

const notionTextColorMap: Record<NotionTagColor, string> = {
    'default': '#333',
    'gray': '#37352F',
    'brown': '#37352F',
    'orange': '#37352F',
    'yellow': '#37352F',
    'green': '#37352F',
    'blue': '#37352F',
    'purple': '#37352F',
    'pink': '#37352F',
    'red': '#37352F',
};


// getServerSideProps 함수는 이전과 동일합니다.
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    if (!id) {
        return {
            notFound: true,
        };
    }

    const productItem = await getPageContent(id);

    if (!productItem || !productItem.results || !productItem.properties) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            productItem,
        },
    };
};

// NotionPage 컴포넌트는 props로 데이터를 받습니다.
interface NotionPageProps {
    productItem: {
        results: any[]; // Notion API 블록 객체 배열
        properties: any; // Notion API 페이지 속성 객체
        // getPageContent에서 반환하는 다른 속성들도 여기에 추가할 수 있습니다.
    } | null;
}

export default function NotionPage({ productItem }: NotionPageProps) {
    console.log("Product Item Data: ", productItem);

    if (!productItem || !productItem.results || !productItem.properties) {
        return <div>데이터를 불러오지 못했습니다.</div>;
    }

    const pageProperties = productItem.properties;

    // 페이지 제목 가져오기 (속성 이름은 실제 Notion DB에 맞게 확인 필요)
    const titleProperty = pageProperties['이름']; // '이름' 속성이 제목이라고 가정
    let pageTitle = '제목 없음';
    if (titleProperty && titleProperty.type === 'title' && titleProperty.title.length > 0) {
        pageTitle = titleProperty.title[0].plain_text; // rich_text 배열의 첫 번째 요소의 plain_text 사용
    }

    // 생성일 가져오기 및 포맷팅 (이전 답변의 로직 활용)
    const createdTimeProperty = pageProperties['생성일']; // '생성일' 속성이라고 가정
    let formattedCreatedTime = '생성일 정보 없음';
    if (createdTimeProperty && createdTimeProperty.type === 'created_time' && createdTimeProperty.created_time) {
        const date = new Date(createdTimeProperty.created_time);
        if (!isNaN(date.getTime())) {
            const datePart = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
            const timePart = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
            formattedCreatedTime = `${datePart} ${timePart}`;
        } else {
            formattedCreatedTime = '유효하지 않은 생성일 날짜';
        }
    }


    // 태그 속성 가져오기
    const tagsProperty = pageProperties['태그']; // '태그' 속성이라고 가정
    let tags: { id: string; name: string; color: NotionTagColor }[] = [];
    if (tagsProperty && tagsProperty.type === 'multi_select') {
        tags = tagsProperty.multi_select;
    }


    return (
        <div className="notion-page-container"> {/* 전체 페이지 컨테이너 */}
            {/* 페이지 제목 표시 */}
            <h1 className='notion-h1'>{pageTitle}</h1>

            {/* 생성일 표시 */}
            <span>생성일: {formattedCreatedTime}</span>

            {/* 태그 정보 표시 */}
            {tags.length > 0 && (
                <div className="notion-tags-container items-center" style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    태그:
                    {tags.map((tag) => {
                        const tagColor = tag.color;
                        const backgroundColor = notionColorToRGBA[tagColor] || notionColorToRGBA['default'];
                        const textColor = notionTextColorMap[tagColor] || notionTextColorMap['default'];

                        return (
                            <span
                                key={tag.id}
                                className='items-center flex'
                                style={{
                                    backgroundColor: backgroundColor,
                                    color: textColor,
                                    padding: '1px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.9em',
                                    fontWeight: 'normal',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {tag.name}
                            </span>
                        );
                    })}
                </div>
            )}
            <hr />
            {productItem.results.map((block) => (
                <NotionBlockRenderer key={block.id} block={block} />
            ))}
        </div>
    );
}
