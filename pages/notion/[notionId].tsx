// pages/notion-detail/[id].tsx
import { GetServerSideProps } from 'next';

import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';

import { getNotionPageRecordMap } from '@/lib/notion';


interface NotionDetailPageProps {
    recordMap: ExtendedRecordMap | null;
    error?: string; // 오류 메시지를 위한 속성 추가
}

export default function NotionDetailPage({ recordMap, error }: NotionDetailPageProps) {
    // 오류가 발생했으면 메시지 표시
    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>데이터 로딩 오류</h2>
                <p>{error}</p>
                <p>페이지 ID와 Notion 통합 설정을 다시 확인해주세요.</p>
            </div>
        );
    }

    if (!recordMap) {
        return (
            <div style={{ padding: '20px' }}>
                노션 페이지 데이터를 불러오지 못했습니다. 페이지 ID와 공개 설정을 확인해 주세요.
            </div>
        );
    }
    console.log(recordMap)
    // NotionRenderer를 사용하여 recordMap 데이터를 렌더링합니다.
    return (
        <div>
            {/* react-notion-x의 기본 스타일을 적용합니다. */}
            <style jsx global>{`
        @import 'react-notion-x/src/styles.css';
        /* 필요하다면 여기에 추가적인 사용자 정의 스타일을 작성할 수 있습니다. */
        .notion-page {
           max-width: 900px; /* 페이지 최대 너비 설정 예시 */
           margin: 0 auto; /* 중앙 정렬 예시 */
           padding: 20px; /* 패딩 추가 예시 */
        }
      `}</style>

            <NotionRenderer
                recordMap={recordMap}
                fullPage={true} // 전체 페이지 레이아웃으로 렌더링 (필요에 따라 false로 변경)
                darkMode={false} // 다크 모드 설정 (필요에 따라 true로 변경)
            />
        </div>
    );
}

// 요청 시마다 데이터를 가져오기 위해 getServerSideProps를 사용합니다.
export const getServerSideProps: GetServerSideProps<NotionDetailPageProps> = async (context) => {
    // URL 파라미터에서 'id' 값을 가져옵니다.
    const { id } = context.params || {};
    console.log(id)
    // id가 없거나 문자열이 아니면 404 페이지 반환
    if (!id || typeof id !== 'string') {
        return {
            notFound: true, // 해당 경로에 해당하는 페이지가 없음을 알림
        };
    }

    try {
        // getNotionPageRecordMap 함수를 호출하여 recordMap 데이터 가져오기
        const recordMap = await getNotionPageRecordMap(id);

        // 성공적으로 데이터를 가져왔으면 props로 전달
        return {
            props: {
                recordMap,
            },
        };

    } catch (error: any) {
        // getNotionPageRecordMap 함수에서 발생한 예외를 여기서 잡습니다.
        console.error(`Error in getServerSideProps for page ID ${id}:`, error);

        // 오류 발생 시 props에 recordMap: null과 error 메시지를 담아 반환
        return {
            props: {
                recordMap: null,
                error: error.message || `페이지 ${id} 데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.`,
            },
        };
    }
};
