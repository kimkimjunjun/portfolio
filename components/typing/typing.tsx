import React, { useEffect, useRef, useState } from "react";

interface TimeProps {
    onTypingComplete: () => void;
}

export default function TypingComponent({ onTypingComplete }: TimeProps) {
    const [word, setWord] = useState('');
    let sentence = "안녕하세요\n 프론트엔드 개발자 김준휘입니다";
    const currentIndex = useRef(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (sentence.length > currentIndex.current) {
                // 직접 currentIndex.current 값을 사용하여 현재 문자를 가져오고 업데이트
                const nextChar = sentence[currentIndex.current];
                setWord((word) => word + nextChar);
                currentIndex.current += 1;
            } else {
                clearInterval(timerId);
                onTypingComplete(); // 모든 글자가 나왔을 때 부모 컴포넌트에 알림
            }
        }, 100);

        return () => clearInterval(timerId);
    }, [onTypingComplete]);

    const renderedText = word.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < word.split('\n').length - 1 && <br />}
        </React.Fragment>
    ));

    return (
        <>
            <p className="text-white text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-semibold m-auto text-center flex">{renderedText}</p>
        </>
    );
};