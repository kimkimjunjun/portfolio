
interface AccordionItem {
    title: string;
    details: string[];
}

interface OperationalSectionProps {
    experienceData: AccordionItem[];
    openExperienceIndices: Set<number>;
    handleExperienceTitleClick: (index: number) => void;
}



export default function Operational({ experienceData, openExperienceIndices, handleExperienceTitleClick }: OperationalSectionProps) {
    return (
        <div className="text-left flex flex-col mx-[1rem] lg:w-[56rem]">
            <div className='flex flex-col'>
                <h1 className='text-[1.3rem] md:text-[2rem] font-semibold'>실제 운영 경험</h1>
                <div>
                    {experienceData.map((experience, index) => {
                        const isOpen = openExperienceIndices.has(index);

                        const titleTextWithoutIcon = experience.title.replace("▶ ", "");

                        return (
                            <div key={index} className='my-[0.5rem]'>
                                <h2
                                    className='text-[1rem] md:text-[1.2rem] font-medium w-fit cursor-pointer px-[0.5rem] hover:bg-gray-200 rounded-[0.5rem]'
                                    onClick={() => handleExperienceTitleClick(index)}
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
                                        {experience.details.map((detail, detailIndex) => (
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
            </div>
        </div>

    )
}