import rosemain from '@/public/images/rosemain.png';
import trippy from '@/public/images/trippy.png';
import spark from '@/public/images/spark.png';
import muin from '@/public/images/muin.png';
import ProjectCard from './projectcard';
import chatbot from '@/public/images/slides/chatbot1.png'

const projectsData = [
    {
        href: "/rosegold",
        imageSrc: rosemain, // 임포트한 이미지 변수 사용
        title: "숙박업소 관리 플랫폼",
        description: "LLM을 활용한 고객 대응 자동화 및 수많은 객실들을 간편하게 관리하는 플랫폼",
        date: "2024.03 ~ 2024.12"
    },
    {
        href: "/trippy",
        imageSrc: trippy,
        title: "여행지 정보 공유 및 날씨 추천 플랫폼",
        description: "한국관광공사 및 기상청 공공데이터를 활용하여 여행지 추천 및 후기를 공유할 수 있는 플랫폼",
        date: "2024.04 ~ 2024.10"
    },
    {
        href: "/spark",
        imageSrc: spark,
        title: "한양대 ERICA 디자인대학 졸업전시회",
        description: "한양대 ERICA 디자인대학 학생들의 졸업작품을 온라인에서 전시해주는 사이트",
        date: "2023.07 ~ 2023.10"
    },
    {
        href: "/moonlight",
        imageSrc: muin,
        title: "실시간 숙박업 무인 관제 시스템",
        description: "인건비 부담이 되는 숙박업소를 위한 정해진 시간동안 무인으로 운영 가능하도록 관제해주는 플랫폼",
        date: "2024.12 ~ 2025.02"
    },
    {
        href: "/chatbot",
        imageSrc: chatbot,
        title: "숙박업소 객실 챗봇",
        description: "LLM기반 호텔 객실별 AI 챗봇",
        date: "2024.03 ~ 2024.12"
    },
];

export default function Project() {
    return (
        <div className='mx-[2rem] lg:ml-[5rem]'>
            <h1 className='text-[2rem] lg:text-[4rem] font-bold mb-[1rem]'>프로젝트</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6">
                {projectsData.map((project, index) => (
                    <ProjectCard
                        key={index}
                        href={project.href}
                        imageSrc={project.imageSrc}
                        title={project.title}
                        description={project.description}
                        date={project.date}
                    />
                ))}
            </div>
        </div>
    );
}
