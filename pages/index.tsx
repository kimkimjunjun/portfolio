'use client'; // IntersectionObserver와 상태 관리를 사용하므로 클라이언트 컴포넌트여야 합니다.

import { useEffect, useState, useRef } from "react"; // useRef 훅 임포트
import TypingComponent from "@/components/typing/typing";
// SideBar 컴포넌트 임포트 (Props를 받도록 수정된 SideBar입니다.)
import SideBar from "@/components/sidebar";
// 각 섹션 컴포넌트들 임포트
import Introduction from "@/components/introduction/introduction";
import Education from "@/components/ground/education";
import Experience from "@/components/ground/experience";
import Skill from "@/components/skill/skill";
import Project from "@/components/project/project";
import Conclusion from "@/components/interest/conclusion";


const sectionIds = [
  "about-me",
  "education",
  "experience",
  "skill",
  "project",
  "conclusion",
];


export default function Home() {
  const [showFirstTag, setShowFirstTag] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [showFirsted, setShowFirsted] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const firstVisit = typeof window !== 'undefined' ? localStorage.getItem('firstVisit') : null;

  useEffect(() => {


    if (!firstVisit) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('firstVisit', 'false');
      }
    } else {
      setShowFirstTag(false);
      setIsClicked(true);
    }
  }, []);

  const handleTypingComplete = () => {
    setIsClicked(true);
    const timer = setTimeout(() => {
      setShowFirstTag(false);
    }, 3000);

    return () => clearTimeout(timer);
  };


  useEffect(() => {
    if (showFirstTag) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element); // 
      }
    });


    return () => {
      observer.disconnect();
    };
  }, [showFirstTag]);


  return (
    <div>
      {showFirstTag ? (
        <div className={`${isClicked ? "fadeOut" : ""}  w-full h-screen bg-black flex`}>
          <TypingComponent onTypingComplete={handleTypingComplete} />
        </div>
      ) : (
        <div className={`${!firstVisit ? "fadeIn" : ""} flex h-full w-full flex-col lg:flex-row`}>
          <SideBar activeSectionId={activeSectionId} />

          <div className="w-full ml-0 lg:ml-[15rem] mt-[4rem] lg:mt-0">
            <div id="about-me" className="my-[5rem]">
              <Introduction />
            </div>
            <hr className="mx-[1rem]" />

            <div id="education" className="my-[5rem]">
              <Education />
            </div>
            <hr className="mx-[1rem]" />

            <div id="experience" className="my-[5rem]">
              <Experience />
            </div>
            <hr className="mx-[1rem]" />

            <div id="skill" className="my-[5rem]">
              <Skill />
            </div>
            <hr className="mx-[1rem] " />

            <div id="project" className="my-[5rem]">
              <Project />
            </div>
            <hr className="mx-[1rem]" />

            <div id="conclusion" className="backgroundimg py-[5rem]">
              <Conclusion />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
