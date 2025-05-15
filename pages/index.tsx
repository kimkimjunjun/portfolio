import { useEffect, useState } from "react";
import TypingComponent from "@/components/typing/typing";
import SideBar from "@/components/sidebar";
import Introduction from "@/components/introduction/introduction";
import Education from "@/components/ground/education";
import Experience from "@/components/ground/experience";
import Skill from "@/components/skill/skill";
import Project from "@/components/project/project";
import Conclusion from "@/components/interest/conclusion";
import Cookies from 'js-cookie';
import Upbutton from "@/components/upbutton";


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
  const [shouldApplyFadeIn, setShouldApplyFadeIn] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);


  useEffect(() => {
    const visited = Cookies.get('visited');

    if (!visited) {
      Cookies.set('visited', 'true', { expires: 2 });

      setShowFirstTag(true);
      setShouldApplyFadeIn(true);
    } else {
      setShowFirstTag(false);
      setIsClicked(true);
      setShouldApplyFadeIn(false);
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
        observer.observe(element);
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
        <div className={`${shouldApplyFadeIn ? "fadeIn" : ""} flex h-full w-full flex-col lg:flex-row`}>
          <SideBar activeSectionId={activeSectionId} />

          <div className="w-full ml-0 lg:ml-[15rem] mt-[4rem] lg:mt-0">

            <div id="about-me" className="my-[5rem] md:my-[9rem]">
              <Introduction />
            </div>
            <hr className="mx-[1rem]" />

            <div id="education" className="my-[5rem] md:my-[9rem]">
              <Education />
            </div>
            <hr className="mx-[1rem]" />

            <div id="experience" className="my-[5rem] md:my-[9rem]">
              <Experience />
            </div>
            <hr className="mx-[1rem]" />

            <div id="skill" className="my-[5rem] md:my-[9rem]">
              <Skill />
            </div>
            <hr className="mx-[1rem] " />

            <div id="project" className="my-[5rem] md:my-[9rem]">
              <Project />
            </div>
            <hr className="mx-[1rem]" />

            <div id="conclusion" className="backgroundimg pt-[5rem]">
              <Conclusion />
            </div>
          </div>
          {/* absolute 적용 위로가기 버튼 */}
          <Upbutton />
        </div>
      )}
    </div>
  );
}
