
interface AccordionItem {
    title: string;
    details: string[];
}

type RenderDetailFunction = (detail: string) => React.ReactNode;


interface DetailSectionProps {
    projectsData: AccordionItem[];
    openProjectIndices: Set<number>;
    handleProjectTitleClick: (index: number) => void;

    skillsData: AccordionItem[];
    openSkillIndices: Set<number>;
    handleSkillTitleClick: (index: number) => void;

    trubleData: AccordionItem[];
    openTrubleIndices: Set<number>;
    handleTrubleTitleClick: (index: number) => void;

    renderDetailWithBoldKeyword: RenderDetailFunction;
}

export default function DeatilSection({
    projectsData,
    openProjectIndices,
    handleProjectTitleClick,
    skillsData,
    openSkillIndices,
    handleSkillTitleClick,
    trubleData,
    openTrubleIndices,
    handleTrubleTitleClick,
    renderDetailWithBoldKeyword,
}: DetailSectionProps) {
    return (
        <div className="mt-[1rem] text-left flex flex-col mx-[1rem] lg:w-[56rem]">
            <h1 className='text-[1.3rem] md:text-[2rem] font-semibold'>구현 내용</h1>
            <div>
                {projectsData.map((project, index) => {
                    const isOpen = openProjectIndices.has(index);

                    const titleTextWithoutIcon = project.title.replace("▶ ", "");

                    return (
                        <div key={index} className='my-[0.5rem]'>
                            <h2
                                className='text-[1rem] md:text-[1.2rem] font-medium w-fit cursor-pointer px-[0.5rem] hover:bg-gray-200 rounded-[0.5rem]'
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
                                        ${isOpen ? 'max-h-[500px]' : 'max-h-0'} 
                                        ${isOpen ? 'opacity-100' : 'opacity-0'}
                                        ${isOpen ? 'pt-2' : 'pt-0'}
                                    `}
                            >
                                <ul className='text-[0.8rem] md:text-[1rem] px-[1rem] leading-relaxed'>
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
            <h1 className='text-[1.3rem] md:text-[2rem] font-semibold'>기술 경험</h1>
            <div>
                {skillsData.map((skill, index) => {
                    const isOpen = openSkillIndices.has(index);

                    const titleTextWithoutIcon = skill.title.replace("▶ ", "");

                    return (
                        <div key={index} className='my-[0.5rem]'>
                            <h2
                                className='text-[1rem] md:text-[1.2rem] font-medium w-fit cursor-pointer px-[0.5rem] hover:bg-gray-200 rounded-[0.5rem]'
                                onClick={() => handleSkillTitleClick(index)}
                                aria-expanded={isOpen}
                            >
                                {isOpen ? "▼ " : "▶ "}
                                {titleTextWithoutIcon}
                            </h2>
                            <div
                                className={`
                                        overflow-hidden
                                        transition-[max-height,opacity] duration-500 ease-in-out
                                        ${isOpen ? 'max-h-[500px]' : 'max-h-0'} 
                                        ${isOpen ? 'opacity-100' : 'opacity-0'}
                                        ${isOpen ? 'pt-2' : 'pt-0'}
                                    `}
                            >
                                <ul className='text-[0.8rem] md:text-[1rem] px-[1rem] leading-relaxed'>
                                    {skill.details.map((detail, detailIndex) => (
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
            <h1 className='text-[1.3rem] md:text-[2rem] font-semibold'>트러블 슈팅</h1>
            <div>
                {trubleData.map((trubleItem, index) => {
                    const isOpen = openTrubleIndices.has(index);
                    const titleTextWithoutIcon = trubleItem.title.replace("▶ ", "");

                    return (
                        <div key={index} className='my-[0.5rem]'>
                            <h2
                                className='text-[1rem] md:text-[1.2rem] font-medium w-fit cursor-pointer px-[0.5rem] hover:bg-gray-200 rounded-[0.5rem]'
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
                                        ${isOpen ? 'max-h-[200rem]' : 'max-h-0'} 
                                        ${isOpen ? 'opacity-100' : 'opacity-0'}
                                        ${isOpen ? 'pt-2' : 'pt-0'}
                                    `}
                            >
                                <ul className='text-[0.8rem] md:text-[1rem] px-[1rem] leading-relaxed'>
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