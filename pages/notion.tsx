import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getDatabasePages } from '@/lib/notion';
import { renderPropertyValue } from "@/components/notion/renderValue";
import NotionPageCard from "@/components/notion/notionPageCard";

interface HomeProps {
    data?: PageObjectResponse[];
    error?: string;
}

export default function NotionPage({ data, error }: HomeProps) {
    if (error) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다: {error}</div>;
    }

    if (!data) {
        return <div>데이터를 불러오는 중...</div>;
    }

    const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.last_edited_time);
        const dateB = new Date(b.last_edited_time);

        const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
        const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();

        return timeB - timeA;
    });
    // console.log(data)
    return (
        <div className="" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Link href="/">포트폴리오페이지로 돌아가기</Link>
            <h1 className="text-center text-[1.2rem] md:text-[2rem] my-[2rem] font-bold">NotionDB 기술정리 블로그</h1>
            {data.length > 0 ? (
                <div className="grid gap-[2rem]" style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                }}>
                    {sortedData.map((page) => {
                        return (
                            <NotionPageCard page={page} renderPropertyValue={renderPropertyValue} />
                        );
                    })}
                </div>
            ) : (
                <div>데이터베이스에 페이지가 없습니다.</div>
            )}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    try {
        const data = await getDatabasePages();
        return {
            props: {
                data,
            },
        };
    } catch (error: any) {
        console.error("Error in getServerSideProps (index page):", error);
        return {
            props: {
                error: error.message || "Failed to fetch data from Notion.",
            },
        };
    }
};
