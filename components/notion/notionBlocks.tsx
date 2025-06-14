// components/NotionBlocks.tsx

import React from 'react';
// Notion API 응답 타입이 있다면 임포트합니다. (예: BlockObjectResponse)
// 여기서는 편의상 any를 사용합니다.

interface RichTextProps {
    rich_text: any[]; // 실제 Notion rich text 타입으로 교체 가능
}

// Notion rich_text 배열을 렌더링하는 헬퍼 컴포넌트
// 볼드, 이탤릭 등 스타일 처리는 여기에 추가할 수 있습니다.
const RichTextRenderer: React.FC<RichTextProps> = ({ rich_text }) => {
    if (!rich_text) return null;
    return (
        <React.Fragment>
            {rich_text.map((text: any, index: number) => (
                <React.Fragment key={index}>
                    {/* TODO: text.annotations를 확인하여 볼드, 이탤릭, 밑줄, 코드, 색상 등 스타일 적용 */}
                    {text.text.content}
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};

interface BlockProps {
    block: any; // 실제 Notion 블록 객체 타입으로 교체 가능 (예: BlockObjectResponse)
}

// Heading 1 블록 컴포넌트
export const NotionHeading1: React.FC<BlockProps> = ({ block }) => {
    if (!block.heading_1) return null;
    return (
        <h1 className="notion-h1">
            <RichTextRenderer rich_text={block.heading_1.rich_text} />
        </h1>
    );
};

// Heading 2 블록 컴포넌트
export const NotionHeading2: React.FC<BlockProps> = ({ block }) => {
    if (!block.heading_2) return null;
    return (
        <h2 className="notion-h2">
            <RichTextRenderer rich_text={block.heading_2.rich_text} />
        </h2>
    );
};

// Heading 3 블록 컴포넌트
export const NotionHeading3: React.FC<BlockProps> = ({ block }) => {
    if (!block.heading_3) return null;
    return (
        <h3 className="notion-h3">
            <RichTextRenderer rich_text={block.heading_3.rich_text} />
        </h3>
    );
};

// Paragraph 블록 컴포넌트
export const NotionParagraph: React.FC<BlockProps> = ({ block }) => {
    if (!block.paragraph) return null;
    return (
        <p className="notion-paragraph">
            <RichTextRenderer rich_text={block.paragraph.rich_text} />
        </p>
    );
};

// 리스트 아이템 블록 컴포넌트 (번호 매기기, 글머리 기호)
// 참고: Notion처럼 완벽하게 렌더링하려면 연속된 리스트 아이템을
// <ol> 또는 <ul> 태그로 감싸는 추가 로직이 필요합니다.
// 여기서는 각 아이템별로 <li>를 렌더링합니다.
export const NotionListItem: React.FC<BlockProps> = ({ block }) => {
    const richText = block.numbered_list_item?.rich_text || block.bulleted_list_item?.rich_text;
    if (!richText) return null; // rich_text가 없으면 렌더링하지 않음

    const className = `notion-list-item ${block.type === 'numbered_list_item' ? 'notion-numbered-list-item' : 'notion-bulleted-list-item'}`;

    return (
        <li className={className}>
            <RichTextRenderer rich_text={richText} />
        </li>
    );
};


// 모든 블록 타입을 받아서 적절한 컴포넌트를 선택하여 렌더링하는 메인 렌더러 컴포넌트
export const NotionBlockRenderer: React.FC<BlockProps> = ({ block }) => {
    switch (block.type) {
        case "heading_1":
            return <NotionHeading1 block={block} />;
        case "heading_2":
            return <NotionHeading2 block={block} />;
        case "heading_3":
            return <NotionHeading3 block={block} />;
        case "paragraph":
            return <NotionParagraph block={block} />;
        case "numbered_list_item":
        case "bulleted_list_item":
            return <NotionListItem block={block} />;
        // TODO: 다른 Notion 블록 타입 (image, code, quote, callout 등)에 대한 케이스 추가
        // 예: case "image": return <NotionImage block={block} />;
        // 예: case "code": return <NotionCode block={block} />;
        default:
            // 지원하지 않는 블록 타입은 콘솔에 경고를 표시하고 렌더링하지 않습니다.
            console.warn(`Unsupported block type for rendering: ${block.type}`, block);
            return null;
    }
};
