import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getDatabasePages } from '@/lib/notion';
import { renderPropertyValue } from "@/components/notion/renderValue";

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
    // console.log(data)
    return (
        <div className="" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Link href="/">포트폴리오페이지로 돌아가기</Link>
            <h1 className="text-center text-[1.2rem] md:text-[2rem] my-[2rem]">NotionDB 기술정리 블로그</h1>
            {data.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '20px',
                }}>
                    {data.map((page) => {
                        const nameProperty = page.properties?.['이름'];
                        const titleProperty = (nameProperty && nameProperty.type === 'title' && nameProperty.title.length > 0)
                            ? nameProperty.title[0].plain_text
                            : '제목 없음';
                        const coverImage = page.cover?.type === 'external' ? page.cover.external.url : page.cover?.type === 'file' ? page.cover.file.url : null;

                        let formattedCreatedTime = '생성일 정보 없음';
                        if (page.last_edited_time) {
                            const date = new Date(page.last_edited_time);
                            if (!isNaN(date.getTime())) {
                                const datePart = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
                                // const timePart = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
                                formattedCreatedTime = `${datePart}`;
                            } else {
                                formattedCreatedTime = '유효하지 않은 생성일 날짜';
                            }
                        }
                        return (
                            <Link href={`/notion/${page.id}`} key={page.id} passHref>
                                <div className="hover:bg-gray-200 transition-all duration-200" style={{
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    height: '100%',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}>
                                    {coverImage && (
                                        <img
                                            src={coverImage}
                                            alt={titleProperty}
                                            style={{
                                                width: '100%',
                                                height: '150px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}
                                    <div style={{ padding: '15px', flexGrow: 1 }}>
                                        <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.1em' }}>
                                            {titleProperty}
                                        </h3>
                                        <div style={{ fontSize: '0.9em', color: '#555' }}>
                                            {Object.entries(page.properties).map(([propertyName, propertyValue]) => (
                                                propertyName !== '이름' && propertyName !== '태그' ? null : (
                                                    <div key={propertyName} style={{ marginBottom: '5px' }}>
                                                        {renderPropertyValue(propertyValue)}
                                                    </div>
                                                )
                                            ))}
                                            <p className="flex">마지막 업데이트: {formattedCreatedTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
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
