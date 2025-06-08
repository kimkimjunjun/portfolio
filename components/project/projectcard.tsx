// src/components/ProjectCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
    href: string;
    imageSrc: string | StaticImageData;
    videoSrc?: string;
    title: string;
    description: string;
    date: string;
}

export default function ProjectCard({ href, imageSrc, videoSrc, title, description, date }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <Link href={href} passHref legacyBehavior>
            <div
                className="
                min-w-[20rem]
                border border-gray-300 rounded-[4px]
                shadow-md
                project hover:-translate-y-2 duration-300
                overflow-hidden
                flex flex-col
                cursor-pointer {/* 링크처럼 보이도록 커서 스타일 추가 */}
            "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className='w-full relative border-b border-gray-300'>
                    {isHovered && videoSrc ? (
                        <video
                            className='top-0 left-0 w-full h-[17rem] object-cover block rounded-t-md'
                            src={videoSrc}
                            loop
                            muted
                            playsInline
                            autoPlay
                        />
                    ) : (
                        <Image
                            className='top-0 left-0 w-full h-[17rem] object-cover block rounded-t-md'
                            src={imageSrc}
                            alt={`${title} 이미지`}
                            width={320}
                            height={272}
                            priority={!isHovered}
                        />
                    )}
                </div>

                <div className={`p-4 flex-1 bg-white`}>
                    <h4 className='text-[1rem] font-bold m-0 text-ellipsis overflow-hidden whitespace-nowrap'>
                        {title}
                    </h4>
                    <div className='flex-1'>
                        <p className='break-words text-[0.875rem] h-[2.5rem] text-ellipsis overflow-hidden'>
                            {description}
                        </p>
                    </div>
                </div>
                <span className='ml-auto pb-[1rem] pr-[1rem] font-bold text-[0.8rem] text-gray-400'>{date}</span>
            </div>
        </Link>
    );
}
