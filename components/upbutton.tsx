import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import feedback from "@/public/images/feedback.png"

export default function Upbutton() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = useCallback(() => {
        if (typeof window === 'undefined') return;

        const scrollTop = window.scrollY;
        const scrollThreshold = 100;

        if (scrollTop > scrollThreshold) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);


    useEffect(() => {
        if (typeof window === 'undefined') return;

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


    const handleScrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div>
            <div className={`
            fixed right-5 z-20 group flex items-center transition-[bottom] duration-300 ease-in-out 
            ${isVisible ? 'bottom-5 pointer-events-auto' : 'bottom-[-5rem] pointer-events-none'} 
        `}>
                <span className="
                text-white font-semibold text-sm mr-2 bg-gray-600 p-[0.5rem] rounded-[0.8rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100
            ">
                    위로가기
                </span>

                <button
                    className="hover:opacity-80 w-fit shadow-lg p-[1rem] rounded-full bg-amber-100 cursor-pointer z-10"
                    onClick={handleScrollToTop}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3h14"></path><path d="m18 13-6-6-6 6"></path><path d="M12 7v14"></path></svg>
                </button>
            </div>
            {/* <div className={`
            fixed right-5 z-20 group flex items-center transition-[bottom] duration-300 ease-in-out pointer-events-auto
            ${isVisible ? 'bottom-22' : 'bottom-5'}
        `}>
                <span className="
                text-white font-semibold text-sm mr-2 bg-gray-600 p-[0.5rem] rounded-[0.8rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100
            ">
                    피드백주기
                </span>

                <button
                    className="hover:opacity-80 w-fit shadow-lg p-[1rem] rounded-full bg-amber-100 cursor-pointer z-10"
                >
                    <Image src={feedback} width={20} height={20} alt='' />
                </button>
            </div> */}

        </div>
    )
}
