// components/NotionBlocks.tsx

import { RichTextItemResponse } from '@notionhq/client';
import React from 'react';

interface RichTextProps {
    rich_text: RichTextItemResponse[];
}

const RichTextRenderer: React.FC<RichTextProps> = ({ rich_text }) => {
    if (!rich_text) return null;
    return (
        <React.Fragment>
            {rich_text.map((text: any, index: number) => (
                <React.Fragment key={index}>
                    {text.text.content}
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};

interface BlockProps {
    block: any;
}

export const NotionHeading1: React.FC<BlockProps> = ({ block }) => {
    if (!block.heading_1) return null;
    return (
        <h1 className="notion-h1">
            <RichTextRenderer rich_text={block.heading_1.rich_text} />
        </h1>
    );
};

export const NotionHeading2: React.FC<BlockProps> = ({ block }) => {
    if (!block.heading_2) return null;
    return (
        <h2 className="notion-h2">
            <RichTextRenderer rich_text={block.heading_2.rich_text} />
        </h2>
    );
};

export const NotionHeading3: React.FC<BlockProps> = ({ block }) => {
    if (!block.heading_3) return null;
    return (
        <h3 className="notion-h3">
            <RichTextRenderer rich_text={block.heading_3.rich_text} />
        </h3>
    );
};

export const NotionParagraph: React.FC<BlockProps> = ({ block }) => {
    if (!block.paragraph) return null;
    return (
        <p className="notion-paragraph">
            <RichTextRenderer rich_text={block.paragraph.rich_text} />
        </p>
    );
};


export const NotionListItem: React.FC<BlockProps> = ({ block }) => {
    const richText = block.numbered_list_item?.rich_text || block.bulleted_list_item?.rich_text;
    if (!richText) return null;

    const className = `notion-list-item ${block.type === 'numbered_list_item' ? 'notion-numbered-list-item' : 'notion-bulleted-list-item'}`;

    return (
        <li className={className}>
            <RichTextRenderer rich_text={richText} />
        </li>
    );
};

export const NotionCode: React.FC<BlockProps> = ({ block }) => {
    if (!block.code) return null;

    const codeContent = block.code.rich_text.map((rt: any) => rt.plain_text).join('');
    const language = block.code.language || 'plain text';

    return (
        <pre className="notion-code">
            {/* <div className="notion-code-language">{language}</div> */}
            <code className={`language-${language}`}>
                {codeContent}
            </code>
        </pre>
    );
};


export const NotionBlockRenderer: React.FC<BlockProps> = ({ block }) => {
    switch (block.type) {
        case "heading_1":
            return <NotionHeading1 block={block} key={block.id} />;
        case "heading_2":
            return <NotionHeading2 block={block} key={block.id} />;
        case "heading_3":
            return <NotionHeading3 block={block} key={block.id} />;
        case "paragraph":
            return <NotionParagraph block={block} key={block.id} />;
        // case "numbered_list_item":
        case "bulleted_list_item":
            return <NotionListItem block={block} key={block.id} />;
        case "code":
            return <NotionCode block={block} key={block.id} />;
        default:
            console.warn(`Unsupported block type for rendering: ${block.type}`, block);
            return null;
    }
};
