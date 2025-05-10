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

export default function SideBar() {
    const desktopScrollOffset = 81;

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
        <div className="
        fixed top-0 left-0 w-full h-auto flex flex-row items-center justify-center p-4 border-b border-gray-300 shadow-md bg-white z-10
        lg:fixed lg:top-auto lg:left-auto lg:h-screen lg:w-[15rem] lg:flex-col lg:border-r lg:border-gray-300 lg:shadow-2xl lg:p-0 lg:items-stretch lg:justify-start lg:z-auto lg:bg-transparent
    ">
            <div className="
            flex flex-row space-x-1 lg:flex-col lg:space-y-5 lg:mt-[3rem] lg:px-[1rem] font-extrabold lg:space-x-0 items-center
        ">
                {sections.map((section) => (
                    <span
                        key={section.id}
                        className="
                        hover:bg-gray-400 hover:text-white cursor-pointer text-center
                        text-[0.5rem] md:text-[1rem] lg:text-[1.5rem]                    
                        py-[0.5rem] rounded-[1rem] px-[0.5rem]
                        lg:px-[0.5rem] lg:py-[0.5rem]
                    "
                        onClick={() => handleScrollToSection(section.id)}
                    >
                        {section.name}
                    </span>

                ))}
            </div>
        </div>
    );
}
