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
import { Analytics } from "@vercel/analytics/next"
import Head from "next/head";

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
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

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
    <>
      <Head>
        <title>개발자 김준휘의 포트폴리오</title>
        <meta property="og:title" content="개발자 김준휘의 포트폴리오" />
        <meta property="og:description" content="개발자 김준휘의 기술 스택, 프로젝트 경험, 교육 과정 등을 담은 온라인 포트폴리오입니다." />
        <meta property="og:url" content="https://junhwikim.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="google-site-verification" content={googleSiteVerification} />
      </Head>
      <Analytics />
      {showFirstTag ? (
        <div className={`${isClicked ? "fadeOut" : ""}  w-full h-screen bg-black flex`}>
          <TypingComponent onTypingComplete={handleTypingComplete} />
        </div>
      ) : (
        <div className={`${shouldApplyFadeIn ? "fadeIn" : ""} flex h-full w-full flex-col lg:flex-row`}>
          <SideBar activeSectionId={activeSectionId} />
          <main className="flex-grow w-full mt-[4rem] lg:mt-0 lg:ml-[15rem]">
            <section id="about-me" className="mt-[5rem] mb-[8rem] md:my-[9rem]">
              <Introduction />
            </section>

            <hr className="mx-[1rem]" />

            <section id="education" className="my-[5rem] md:my-[9rem]">
              <Education />
            </section>

            <hr className="mx-[1rem]" />

            <section id="experience" className="my-[5rem] md:my-[9rem]">
              <Experience />
            </section>

            <hr className="mx-[1rem]" />

            <section id="skill" className="my-[5rem] md:my-[9rem]">
              <Skill />
            </section>

            <hr className="mx-[1rem] " />

            <section id="project" className="my-[5rem] md:my-[9rem]">
              <Project />
            </section>

            <hr className="mx-[1rem]" />

            <section id="conclusion" className="backgroundimg pt-[4rem] md:pt-[5rem]">
              <Conclusion />
            </section>
          </main>
          {/* absolute 적용 위로가기 버튼 */}
          <Upbutton />
        </div>
      )}
    </>
  );
}
