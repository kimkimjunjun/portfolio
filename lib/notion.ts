// lib/notion.ts
// @notionhq/client는 데이터베이스 목록 가져오기 등 다른 용도로 계속 사용합니다.
import { Client } from "@notionhq/client";
import { PageObjectResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// notion-client 임포트
import { NotionAPI } from 'notion-client';

const notionSecret = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

// @notionhq/client 인스턴스 (데이터베이스 쿼리 등)
const notion = new Client({ auth: notionSecret });

// notion-client 인스턴스 (NotionRenderer용 recordMap 가져오기)
// 비공개 페이지를 가져오려면 Notion 웹사이트에서 tokenV2 쿠키 값을 찾아 환경 변수로 설정해야 합니다.
// 공개 페이지는 tokenV2 없이도 가져올 수 있습니다.
const notionAPI = new NotionAPI({
    authToken: notionSecret // 비공개 페이지 접근 시 필요
});


// 데이터베이스의 모든 페이지 목록을 가져오는 함수 (갤러리 뷰용)
export async function getDatabasePages(): Promise<PageObjectResponse[]> {
    if (!notionSecret || !notionDatabaseId) {
        console.error("환경 변수 NOTION_API_KEY 또는 NOTION_DATABASE_ID가 설정되지 않았습니다.");
        throw new Error("환경 변수 NOTION_API_KEY 또는 NOTION_DATABASE_ID가 설정되지 않았습니다.");
    }

    try {
        const dbQueryResponse = await notion.databases.query({
            database_id: notionDatabaseId,
            sorts: [{ property: '생성일', direction: 'descending' }],
        });

        const pages = dbQueryResponse.results as PageObjectResponse[];
        return pages;

    } catch (error: any) {
        console.error("Notion 데이터베이스 페이지 목록 가져오기 오류:", error);
        throw new Error(`Notion 데이터베이스 페이지 목록 가져오기 실패: ${error.message}`);
    }
}

// 특정 페이지의 recordMap을 가져오는 함수 (상세 페이지용 - notion-client 사용)
export async function getNotionPageRecordMap(pageId: string): Promise<any> {
    // notion-client는 기본적으로 공개된 페이지에 접근합니다.
    // 비공개 페이지는 tokenV2 설정이 필요합니다.
    if (!notionSecret) {
        console.warn("환경 변수 NOTION_TOKEN_V2가 설정되지 않았습니다. 비공개 Notion 페이지를 가져올 수 없습니다.");
        console.warn("페이지가 비공개라면 Notion 웹사이트에서 tokenV2 쿠키 값을 찾아 환경 변수에 설정해주세요.");
    }

    try {
        // notion-client의 getPage 함수는 NotionRenderer에 적합한 recordMap을 반환합니다.
        const recordMap = await notionAPI.getPage(pageId);

        // recordMap이 비어있는지 확인하는 간단한 로직 추가
        // NotionAPI.getPage는 에러를 던지지 않고 빈 recordMap을 반환할 수 있습니다.
        if (!recordMap || Object.keys(recordMap.block).length === 0) {
            console.warn(`페이지 ID ${pageId}에 대한 recordMap이 비어있습니다.`);
            // 페이지가 존재하지 않거나 접근 권한이 없거나 내용이 비어있을 수 있습니다.
            throw new Error(`페이지 ${pageId}의 내용을 찾을 수 없습니다. 페이지 ID, 공개 설정 또는 내용을 확인해주세요.`);
        }

        return recordMap;

    } catch (error: any) {
        console.error(`페이지 ID ${pageId}에 대한 recordMap 가져오기 오류:`, error);
        // notion-client 에러 메시지는 다를 수 있으므로 일반적인 메시지로 감쌉니다.
        throw new Error(`페이지 ${pageId} 데이터 가져오기 실패: ${error.message}. 페이지 ID, 공개 설정 또는 tokenV2 설정을 확인해주세요.`);
    }
}

// 참고: buildRecordMap 함수는 @notionhq/client 결과물을 notion-client 결과물처럼
// 수동으로 구성할 때 사용되었으나, notion-client의 getPage를 직접 사용하면서
// 상세 페이지 렌더링에는 더 이상 필요하지 않습니다.
// export function buildRecordMap(page: PageObjectResponse, blocks: BlockObjectResponse[]): any {
//     const recordMap: any = { block: {} };
//     // @ts-ignore
//     recordMap.block[page.id] = { value: page, role: 'reader' };
//     blocks.forEach(block => {
//         // @ts-ignore
//         recordMap.block[block.id] = { value: block, role: 'reader' };
//     });
//     return recordMap;
// }
