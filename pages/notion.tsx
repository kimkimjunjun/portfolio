import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getDatabasePages } from '@/lib/notion';
import { renderPropertyValue } from "@/components/notion/renderValue";
import NotionPageCard from "@/components/notion/notionPageCard";

import Skeleton from 'react-loading-skeleton';


interface HomeProps {
    data?: PageObjectResponse[];
    error?: string;
}

export default function NotionPage({ data, error }: HomeProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data || error) {
            setIsLoading(false);
        }
    }, [data, error]);

    if (error) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다: {error}</div>;
    }

    if (!data || isLoading) {
        const skeletonCardCount = 10;

        return (
            <div className="" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <Link href="/">포트폴리오페이지로 돌아가기</Link>
                <h1 className="text-center text-[1.2rem] md:text-[2rem] my-[2rem] font-bold">NotionDB 기술정리 블로그</h1>
                <div className="grid gap-[2rem]" style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                }}>
                    {Array.from({ length: skeletonCardCount }).map((_, index) => (
                        <div key={index} style={{
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}>
                            {/* 스켈레톤 이미지 영역 */}
                            <Skeleton height={150} />
                            <div style={{ padding: '15px', flexGrow: 1 }}>
                                {/* 스켈레톤 제목 영역 */}
                                <Skeleton width="80%" height={20} style={{ marginBottom: '10px' }} />
                                {/* 스켈레톤 텍스트/태그 영역 */}
                                <Skeleton count={2} height={15} style={{ marginBottom: '5px' }} />
                                {/* 스켈레톤 업데이트 날짜 영역 */}
                                <Skeleton width="60%" height={15} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.last_edited_time);
        const dateB = new Date(b.last_edited_time);
        const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
        const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
        return timeB - timeA;
    });

    return (
        <div className="" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Link href="/">포트폴리오페이지로 돌아가기</Link>
            <h1 className="text-center text-[1.2rem] md:text-[2rem] my-[2rem] font-bold">NotionDB 기술정리 블로그</h1>
            {sortedData.length > 0 ? (
                <div className="grid gap-[2rem]" style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                }}>
                    {sortedData.map((page) => (
                        <NotionPageCard
                            key={page.id}
                            page={page}
                            renderPropertyValue={renderPropertyValue}
                        />
                    ))}
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
