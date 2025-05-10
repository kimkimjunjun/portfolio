import { useEffect, useState } from "react";
import TypingComponent from "@/components/typing/typing";
import SideBar from "@/components/sidebar";
import Introduction from "@/components/introduction/introduction";
import Education from "@/components/ground/education";
import Experience from "@/components/ground/experience";
import Skill from "@/components/skill/skill";
import Project from "@/components/project/project";
import Conclusion from "@/components/interest/conclusion";



export default function Home() {
  const [showFirstTag, setShowFirstTag] = useState(true); // 첫 번째 태그를 보여줄지 결정하는 상태
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');

    if (!firstVisit) {
      localStorage.setItem('firstVisit', 'false');
    } else {
      setShowFirstTag(false);
    }

  }, [])

  const handleTypingComplete = () => {
    setIsClicked(true);
    const timer = setTimeout(() => {
      setShowFirstTag(false);
    }, 3000); // 타이핑이 완료되면 실행될 함수

    return () => clearTimeout(timer);
  };



  return (
    <div>
      {showFirstTag ? (
        <div className={`${isClicked && "fadeOut"}  w-full h-screen bg-black flex`}>
          <TypingComponent onTypingComplete={handleTypingComplete} />
        </div>
      ) : (
        <div className={`${isClicked && "fadeIn"} flex h-full w-full`}>
          <SideBar />
          <div className="w-full ml-0 lg:ml-[15rem] mt-[5rem] lg:mt-0">
            <div id="about-me">
              <Introduction />
            </div>
            <hr className="mx-[1rem] lg:my-[5rem]" />

            <div id="education">
              <Education />
            </div>
            <hr className="mx-[1rem] my-[1.5rem] lg:my-[5rem]" />

            <div id="experience">
              <Experience />
            </div>
            <hr className="mx-[1rem] my-[1.5rem] lg:my-[5rem]" />

            <div id="skill">
              <Skill />
            </div>
            <hr className="mx-[1rem] my-[1.5rem] lg:my-[5rem]" />

            <div id="project">
              <Project />
            </div>
            <hr className="mx-[1rem] mt-[5rem]" />
            <div id="conclusion" className="backgroundimg">
              <Conclusion />
            </div>
          </div>
        </div>
      )
      }
    </div>
  );

}
