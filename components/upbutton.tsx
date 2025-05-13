import React, { useState, useEffect, useCallback } from 'react';

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
        <div className={`
            fixed right-5 bottom-5 z-20 group flex items-center
            transition-opacity duration-300 ease-in-out /* 투명도 변화에 애니메이션 적용 */
            ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} /* isVisible 상태에 따라 투명도 및 이벤트 활성화/비활성화 */
        `}>
            <span className="
                text-white font-semibold text-sm mr-2 bg-gray-600 p-[0.5rem] rounded-[0.8rem]
                opacity-0 transition-opacity duration-300 /* 초기 투명, 호버 시 애니메이션 */
                group-hover:opacity-100
            ">
                위로가기
            </span>

            <button
                className="hover:opacity-80 w-fit shadow-lg p-[1rem] rounded-full bg-amber-100 cursor-pointer z-10"
                onClick={handleScrollToTop}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 17" fill="none"><path d="M2 15L14 3L26 15" stroke="black" stroke-width="3" stroke-linecap="round"></path></svg>
            </button>
        </div>
    )
}
