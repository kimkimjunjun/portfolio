import { Client } from "@notionhq/client";
import { PageObjectResponse, BlockObjectResponse, ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from 'notion-client';

const notionSecret = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notionAPI = new NotionAPI();

const notion = new Client({ auth: notionSecret });


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

export const getPageContent = async (pageId: string) => {
    try {
        const pageData = await notion.pages.retrieve({ page_id: pageId }) as PageObjectResponse;

        const blockChildData: ListBlockChildrenResponse = await notion.blocks.children.list({ block_id: pageId });

        return {
            ...blockChildData,
            properties: pageData.properties,
        };

    } catch (error) {
        console.error("Error fetching Notion page content:", error);
        return null;
    }
};