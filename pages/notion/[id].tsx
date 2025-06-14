import { GetServerSideProps } from 'next';
import { getPageContent } from '@/lib/notion';
import 'react-notion-x/src/styles.css';
import React, { useState, useEffect } from 'react'; // useState, useEffect 임포트
import { NotionBlockRenderer } from '@/components/notion/notionBlocks';
import Backbutton from '@/components/backbutton';

import Skeleton from 'react-loading-skeleton';


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


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    if (!id) {
        return {
            notFound: true,
        };
    }

    try {
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
    } catch (error: any) {
        console.error("Error in getServerSideProps (Notion Page):", error);
        return {
            props: {
                productItem: null,
                error: error.message || "Failed to fetch Notion page content.",
            },
        };
    }
};

interface NotionPageProps {
    productItem: {
        results: any[];
        properties: any;
    } | null;
    error?: string;
}

export default function NotionPage({ productItem, error }: NotionPageProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (productItem || error) {
            setIsLoading(false);
        }
    }, [productItem, error]);

    if (isLoading || error || !productItem) {
        if (error) {
            return <div>데이터를 불러오는 중 오류가 발생했습니다: {error}</div>;
        }
        return (
            <div className="notion-page-container" style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
                <Backbutton />
                {/* 스켈레톤 제목 */}
                <div className='notion-h1' style={{ marginTop: '1.5em', marginBottom: '0.5em' }}>
                    <Skeleton height={40} width="80%" />
                </div>
                {/* 스켈레톤 생성일 */}
                <div style={{ marginBottom: '20px' }}>
                    <Skeleton height={15} width="40%" />
                </div>
                {/* 스켈레톤 태그 */}
                <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <Skeleton height={20} width={60} count={3} inline style={{ marginRight: '8px' }} />
                </div>
                <hr style={{ marginBottom: '20px' }} /> {/* 구분선 스켈레톤 */}
                <Skeleton count={5} height={20} style={{ marginBottom: '10px' }} /> {/* 문단 스켈레톤 */}
                <Skeleton height={30} width="60%" style={{ marginBottom: '10px' }} /> {/* 제목 스켈레톤 */}
                <Skeleton count={3} height={20} style={{ marginBottom: '10px' }} /> {/* 문단 스켈레톤 */}
                <Skeleton height={100} style={{ marginBottom: '10px' }} /> {/* 코드 블록 또는 이미지 스켈레톤 */}
                <Skeleton count={2} height={20} style={{ marginBottom: '10px' }} /> {/* 문단 스켈레톤 */}
            </div>
        );
    }

    const pageProperties = productItem.properties;

    const titleProperty = pageProperties['이름'];
    let pageTitle = '제목 없음';
    if (titleProperty && titleProperty.type === 'title' && titleProperty.title.length > 0) {
        pageTitle = titleProperty.title[0].plain_text;
    }

    const createdTimeProperty = pageProperties['생성일'];
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

    const tagsProperty = pageProperties['태그'];
    let tags: { id: string; name: string; color: NotionTagColor }[] = [];
    if (tagsProperty && tagsProperty.type === 'multi_select') {
        tags = tagsProperty.multi_select;
    }

    return (
        <div className="notion-page-container bg-white min-h-screen" style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}> {/* 최대 너비 설정 */}
            <Backbutton />
            <h1 className='notion-h1 text-[4rem]'>{pageTitle}</h1>

            <span>생성일: {formattedCreatedTime}</span>

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
            <hr style={{ marginBottom: '20px' }} />
            {productItem.results.map((block) => (
                <NotionBlockRenderer key={block.id} block={block} />
            ))}
        </div>
    );
}
