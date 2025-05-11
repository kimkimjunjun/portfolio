import { useState } from 'react'; // 이 컴포넌트 자체는 상태를 직접 관리하지 않지만, import 문에 포함되어 있기에 남겨두었습니다. (필요시 제거)

interface AccordionItem {
    title: string;
    details: string[];
}

type RenderDetailFunction = (detail: string) => React.ReactNode; // React.ReactNode는 JSX에서 렌더링 가능한 모든 타입을 포함합니다.


interface DetailSectionProps {
    projectsData: AccordionItem[]; // projectsData 배열은 AccordionItem 객체들의 배열입니다.
    openProjectIndices: Set<number>; // openProjectIndices는 숫자로 이루어진 Set입니다.
    handleProjectTitleClick: (index: number) => void;

    trubleData: AccordionItem[]; // trubleData 배열도 AccordionItem 객체들의 배열입니다.
    openTrubleIndices: Set<number>; // openTrubleIndices는 숫자로 이루어진 Set입니다.
    handleTrubleTitleClick: (index: number) => void;

    renderDetailWithBoldKeyword: RenderDetailFunction; // 만약 Props로 받는다면 이 줄 사용
}

export default function DeatilSection({
    projectsData,
    openProjectIndices,
    handleProjectTitleClick,
    trubleData,
    openTrubleIndices,
    handleTrubleTitleClick,
    renderDetailWithBoldKeyword, // Props로 받는다면 여기에 추가
}: DetailSectionProps) {
    return (
        <div className="mt-[1rem] text-left flex flex-col mx-[1rem] lg:w-[56rem]">
            <h1 className='text-[2rem] font-semibold'>[구현 내용]</h1>
            <div>
                {projectsData.map((project, index) => {
                    const isOpen = openProjectIndices.has(index);

                    const titleTextWithoutIcon = project.title.replace("▶ ", "");

                    return (
                        <div key={index} className='my-[0.5rem]'>
                            <h2
                                className='text-[1.2rem] font-medium w-fit cursor-pointer'
                                onClick={() => handleProjectTitleClick(index)}
                                aria-expanded={isOpen}
                            >
                                {isOpen ? "▼ " : "▶ "}
                                {titleTextWithoutIcon}
                            </h2>
                            <div
                                className={`
                                        overflow-hidden
                                        transition-[max-height,opacity] duration-500 ease-in-out
                                        ${isOpen ? 'max-h-[500px]' : 'max-h-0'} // 상세 내용 최대 높이는 실제 내용에 맞게 조정
                                        ${isOpen ? 'opacity-100' : 'opacity-0'}
                                        ${isOpen ? 'pt-2' : 'pt-0'}
                                    `}
                            >
                                <ul className='text-[1rem]'>
                                    {project.details.map((detail, detailIndex) => (
                                        <li key={detailIndex} >
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
            <h1 className='text-[2rem] font-semibold'>[트러블 슈팅]</h1>
            <div>
                {trubleData.map((trubleItem, index) => {
                    const isOpen = openTrubleIndices.has(index);
                    const titleTextWithoutIcon = trubleItem.title.replace("▶ ", "");

                    return (
                        <div key={index} className='my-[0.5rem]'>
                            <h2
                                className='text-[1.2rem] font-medium w-fit cursor-pointer'
                                onClick={() => handleTrubleTitleClick(index)}
                                aria-expanded={isOpen}
                            >
                                {isOpen ? "▼ " : "▶ "}
                                {titleTextWithoutIcon}
                            </h2>
                            <div
                                className={`
                                        overflow-hidden
                                        transition-[max-height,opacity] duration-500 ease-in-out
                                        ${isOpen ? 'max-h-[500px]' : 'max-h-0'} // 상세 내용 최대 높이는 실제 내용에 맞게 조정
                                        ${isOpen ? 'opacity-100' : 'opacity-0'}
                                        ${isOpen ? 'pt-2' : 'pt-0'}
                                    `}
                            >
                                <ul className='text-[1rem]'>
                                    {trubleItem.details.map((detail, detailIndex) => (
                                        <li key={detailIndex} >
                                            {renderDetailWithBoldKeyword(detail)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}