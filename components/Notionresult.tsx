"use client"

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import 'react-notion-x/src/styles.css';
import { NotionRenderer } from 'react-notion-x';

interface NotionPageProps {
    recordMap: ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: NotionPageProps) {
    const Code = dynamic(
        () => import('react-notion-x/build/third-party/code').then((m) => m.Code),
        {
            ssr: false,
        },
    );
    const Collection = dynamic(
        () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
        {
            ssr: false,
        },
    );
    const Equation = dynamic(
        () => import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
        {
            ssr: false,
        },
    );
    const Modal = dynamic(
        () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
        {
            ssr: false,
        },
    );

    // fullPage는 노션의 헤더와 위계별 링크 기능까지 다 포함된 기능이다.
    return (
        <NotionRenderer
            recordMap={recordMap}
            fullPage
            components={{
                Code,
                Collection,
                Equation,
                Modal,
                nextImage: Image,
                nextLink: Link,
            }}
        />
    );
}