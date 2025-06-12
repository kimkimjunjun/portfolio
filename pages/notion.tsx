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
    console.log(data)
    return (
        <div className="" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="text-center text-[2rem]">NotionDB 기술정리 블로그</h1>
            {data.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '20px', // 카드 간 간격
                }}>
                    {data.map((page) => {
                        // @ts-ignore: properties['이름']이 존재하고 title 타입임을 가정
                        const titleProperty = page.properties?.['이름']?.title?.[0]?.plain_text || '제목 없음';
                        const coverImage = page.cover?.type === 'external' ? page.cover.external.url : page.cover?.type === 'file' ? page.cover.file.url : null;

                        return (
                            <Link href={`/notion/${page.id}`} key={page.id} passHref>
                                <div className="hover:bg-gray-300 transition-all duration-200" style={{
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    overflow: 'hidden', // 커버 이미지 모서리 둥글게
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    height: '100%', // 그리드 아이템 높이 통일
                                    textDecoration: 'none', // Link 컴포넌트 기본 스타일 제거
                                    color: 'inherit', // Link 컴포넌트 기본 스타일 제거
                                }}>
                                    {coverImage && (
                                        <img
                                            src={coverImage}
                                            alt={titleProperty}
                                            style={{
                                                width: '100%',
                                                height: '150px', // 커버 이미지 높이 고정
                                                objectFit: 'cover', // 이미지가 잘리지 않고 비율 유지
                                            }}
                                        />
                                    )}
                                    <div style={{ padding: '15px', flexGrow: 1 }}> {/* flexGrow로 내용 영역이 남은 공간 채우도록 */}
                                        <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.1em' }}>
                                            {titleProperty}
                                        </h3>
                                        <div style={{ fontSize: '0.9em', color: '#555' }}>
                                            {Object.entries(page.properties).map(([propertyName, propertyValue]) => (
                                                propertyName !== '이름' && propertyName !== '생성일' && propertyName !== '태그' ? null : ( // 예시: 이름, 생성일, 태그만 표시
                                                    <div key={propertyName} style={{ marginBottom: '5px' }}>
                                                        {/* <strong>{propertyName}:</strong>{' '} {/* 속성 이름은 생략하고 값만 표시할 수도 있습니다. */}
                                                        {renderPropertyValue(propertyValue)}
                                                    </div>
                                                )
                                            ))}
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
