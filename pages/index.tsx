import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import TypingComponent from "@/components/typing/typing";
import SideBar from "@/components/sidebar";
import Introduction from "@/components/introduction/introduction";
import Education from "@/components/ground/education";
import Experience from "@/components/ground/experience";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <div className="fadeIn flex h-full w-full">
          <SideBar />
          <div className="w-full ml-[10rem]">
            <Introduction />
            <hr className="mx-[1rem] my-[5rem]" />
            <Education />
            <hr className="mx-[1rem] my-[5rem]" />
            <Experience />
            <hr className="mx-[1rem] my-[5rem]" />
          </div>
        </div>
      )
      }
    </div>
  );

}
