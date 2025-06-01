import React from 'react'; // JSX를 위해 필요

interface Section {
    name: string;
    id: string;
}

const sections: Section[] = [
    { name: "ABOUT ME", id: "about-me" },
    { name: "EDUCATION", id: "education" },
    { name: "EXPERIENCE", id: "experience" },
    { name: "SKILL", id: "skill" },
    { name: "PROJECT", id: "project" },
    { name: "CONCLUSION", id: "conclusion" },
];

interface SideBarProps {
    activeSectionId: string | null;
}


export default function SideBar({ activeSectionId }: SideBarProps) {
    const desktopScrollOffset = 85;
    const mobileScrollOffset = 90;

    const handleScrollToSection = (id: string) => {
        const element = document.getElementById(id);

        if (element) {
            const windowWidth = window.innerWidth;
            const currentScrollOffset = windowWidth < 1000 ? mobileScrollOffset : desktopScrollOffset;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - currentScrollOffset,
                behavior: 'smooth',
            });
        }
    };

    return (
        <aside className="
            fixed top-0 left-0 w-full h-auto flex flex-row items-center justify-center p-4 border-b border-gray-300 shadow-md bg-amber-100 z-30
            lg:fixed lg:top-auto lg:left-auto lg:h-screen lg:w-[15rem] lg:flex-col lg:border-r lg:border-gray-300 lg:shadow-2xl lg:p-0 lg:items-stretch lg:justify-start lg:z-auto lg:bg-amber-100
        ">
            <div className="
                flex flex-row space-x-1 lg:flex-col lg:space-y-5 lg:mt-[3rem] lg:px-[1rem] font-extrabold lg:space-x-0 items-center
            ">
                {sections.map((section) => (
                    <span
                        key={section.id}
                        className={`
                              cursor-pointer text-center 
                            text-[0.5rem] md:text-[1rem] lg:text-[1.5rem]
                            py-[0.5rem] rounded-[1rem] px-[0.5rem]
                            lg:px-[0.5rem] lg:py-[0.5rem]
                            ${section.id === activeSectionId ? 'text-black font-extrabold' : 'text-black font-extrabold opacity-50 hover:opacity-70'}
                        `}
                        onClick={() => handleScrollToSection(section.id)}
                    >
                        {section.name}
                    </span>
                ))}
            </div>
        </aside>
    );
}
