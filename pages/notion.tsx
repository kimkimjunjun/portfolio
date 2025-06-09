// pages/notion.tsx
import { GetServerSideProps } from 'next';
import { NotionRenderer } from 'react-notion-x';
import { NotionAPI } from 'notion-client'; // @notionhq/client 대신 notion-client 사용

// react-notion-x 기본 스타일 및 테마 스타일 임포트
// 프로젝트의 _app.tsx나 페이지 상단에서 임포트할 수 있습니다.
// 여기서는 페이지 파일에서 직접 임포트하는 예시입니다.
import 'react-notion-x/src/styles.css';
// 다른 필요한 스타일 (코드 블록, 수학 공식 등)
// import 'prismjs/themes/prism.css'; // 코드 블록 스타일
// import 'katex/dist/katex.min.css'; // 수학 공식 스타일

// .env.local에 설정한 환경 변수 사용
// notion-client는 공개된 Notion 페이지의 경우 API 키가 필수는 아닙니다.
// 하지만 일부 고급 기능이나 비공개 페이지 접근 시 필요할 수 있습니다.
// 여기서는 공개 페이지를 가정하고 NotionAPI를 초기화합니다.
const notion = new NotionAPI(); // NotionAPI는 페이지 ID만으로도 공개 페이지 데이터 가져오기 가능

// 페이지 ID 유효성 검사 (getServerSideProps는 요청 시 실행되므로 여기서는 console.error만 남깁니다.)
const pageId = process.env.NOTION_PAGE_ID;
if (!pageId) {
    console.error("NOTION_PAGE_ID 환경 변수가 설정되지 않았습니다.");
    // 환경 변수가 없는 경우 getServerSideProps에서 notFound를 반환하도록 처리했습니다.
}

// getServerSideProps 함수 정의: 요청 시 서버에서 실행되어 데이터를 fetching
export const getServerSideProps: GetServerSideProps = async () => {
    // 요청이 들어올 때마다 이 코드가 서버에서 실행됩니다.
    if (!pageId) {
        return { notFound: true }; // 환경 변수 없으면 404 반환
    }

    try {
        // notion-client를 사용하여 페이지의 recordMap 가져오기
        const recordMap = await notion.getPage(pageId);

        return {
            props: {
                recordMap,
            },
        };
    } catch (error) {
        console.error("Notion 페이지 fetching 오류:", error);
        // 오류 발생 시 404 페이지를 보여줍니다.
        return { notFound: true };
    }
};

// 페이지 컴포넌트: getServerSideProps에서 받아온 recordMap을 props로 사용
interface NotionPageProps {
    recordMap: any; // notion-client에서 반환하는 recordMap 타입
}

export default function NotionPage({ recordMap }: NotionPageProps) {
    // recordMap이 없거나 오류 발생 시 메시지 표시
    if (!recordMap) {
        return <div>페이지를 찾을 수 없거나 불러오는데 실패했습니다. Notion 페이지 ID와 공개 설정, 환경 변수를 확인해주세요.</div>;
    }

    // NotionRenderer를 사용하여 recordMap을 렌더링
    return (
        <div>
            {/* 페이지 제목은 recordMap에서 추출하거나 NotionRenderer가 자동으로 표시할 수도 있습니다. */}
            {/* notion-utils의 getPageTitle 등을 사용하여 제목을 가져올 수 있습니다. */}
            {/* <title>{getPageTitle(recordMap)}</title> */}

            <NotionRenderer
                recordMap={recordMap}
                fullPage={true} // 전체 페이지 레이아웃 사용 여부 (선택 사항)
                disableHeader={true} // 상단 헤더 표시 여부 (선택 사항)
            // 다른 옵션들을 필요에 따라 추가할 수 있습니다.
            // 예를 들어, 코드 블록 강조 기능 활성화 등
            // components={{
            //   Code, // prismjs 필요
            //   Collection, // 컬렉션(데이터베이스) 렌더링
            //   Equation, // katex 필요
            //   Pdf, // react-pdf 필요
            // }}
            />
        </div>
    );
}
