// src/components/ProjectCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface ProjectCardProps {
    href: string;
    imageSrc: string | StaticImageData;
    title: string;
    description: string;
}

export default function ProjectCard({ href, imageSrc, title, description }: ProjectCardProps) {
    return (
        <Link href={href} passHref>
            <div className="
                min-w-[20rem]                             
                border border-gray-300 rounded-[4px]
                shadow-md                             
                hover:opacity-80 hover:-translate-y-2 duration-300 
                overflow-hidden                       
                flex flex-col                         
            ">
                <div className='w-full relative border-b border-black'>
                    <Image
                        className='top-0 left-0 w-full h-[17rem] object-cover block rounded-t-md'
                        src={imageSrc}
                        alt={`${title} 이미지`}
                    />
                </div>

                <div className={`p-4 flex-1 bg-white`}>
                    <h4 className='text-[1rem] font-bold m-0 text-ellipsis overflow-hidden whitespace-nowrap'>
                        {title}
                    </h4>
                    <div className='flex-1'>
                        <p className='break-words text-[0.875rem] h-[3rem] text-ellipsis overflow-hidden'>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
