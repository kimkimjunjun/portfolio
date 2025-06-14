
import React from 'react';
import Link from 'next/link';
import { PageObjectResponse } from '@notionhq/client';

type RenderPropertyValue = (property: any) => React.ReactNode;

interface NotionPageCardProps {
    page: PageObjectResponse;
    renderPropertyValue: RenderPropertyValue;
}

const NotionPageCard: React.FC<NotionPageCardProps> = ({ page, renderPropertyValue }) => {
    const nameProperty = page.properties?.['이름'];
    const titleProperty = (nameProperty && nameProperty.type === 'title' && nameProperty.title.length > 0)
        ? nameProperty.title[0].plain_text
        : '제목 없음';

    const coverImage = page.cover?.type === 'external' ? page.cover.external.url : page.cover?.type === 'file' ? page.cover.file.url : null;

    let formattedLastedTime = '업데이트 날짜 없음';
    if (page.last_edited_time) {
        const date = new Date(page.last_edited_time);
        if (!isNaN(date.getTime())) {
            const datePart = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
            formattedLastedTime = `${datePart}`;
        } else {
            formattedLastedTime = '유효하지 않은 날짜';
        }
    }

    return (
        <Link href={`/notion/${page.id}`} key={page.id} passHref>
            <div className="hover:bg-gray-200 hover:-translate-y-2 transition-all duration-300 bg-white" style={{
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
                        <p className="flex">마지막 업데이트: {formattedLastedTime}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NotionPageCard;
