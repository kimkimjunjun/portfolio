import { Client } from "@notionhq/client";
import { PageObjectResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from 'notion-client';

const notionSecret = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

const notionAPI = new NotionAPI({
    authToken: notionSecret // 비공개 페이지 접근 시 필요
});


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

export async function getNotionPageRecordMap(pageId: string): Promise<any> {
    if (!notionSecret) {
        console.warn("환경 변수 NOTION_TOKEN_V2가 설정되지 않았습니다. 비공개 Notion 페이지를 가져올 수 없습니다.");
        console.warn("페이지가 비공개라면 Notion 웹사이트에서 tokenV2 쿠키 값을 찾아 환경 변수에 설정해주세요.");
    }

    try {
        const recordMap = await notionAPI.getPage(pageId);

        if (!recordMap || Object.keys(recordMap.block).length === 0) {
            console.warn(`페이지 ID ${pageId}에 대한 recordMap이 비어있습니다.`);
            throw new Error(`페이지 ${pageId}의 내용을 찾을 수 없습니다. 페이지 ID, 공개 설정 또는 내용을 확인해주세요.`);
        }

        return recordMap;

    } catch (error: any) {
        console.error(`페이지 ID ${pageId}에 대한 recordMap 가져오기 오류:`, error);
        throw new Error(`페이지 ${pageId} 데이터 가져오기 실패: ${error.message}. 페이지 ID, 공개 설정 또는 tokenV2 설정을 확인해주세요.`);
    }
}
