'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SliderProps {
    images: string[];
    // 이미지 슬라이더 컨테이너의 고정 높이를 props로 받을 수도 있습니다.
    // containerHeight?: string | number; // 예: '500px', '80vh', 500 (px로 간주)
}

export default function Slider({ images }: SliderProps) { // containerHeight prop이 있다면 추가
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );
        }, 5000); // 5초 간격

        return () => clearInterval(interval);
    }, [images]);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [images]);


    const goToNextImage = () => {
        if (!images || images.length === 0) return;
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % images.length
        );
    };

    const goToPreviousImage = () => {
        if (!images || images.length === 0) return;
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length
        );
    };

    if (!images || images.length === 0) {
        return <div>슬라이드 이미지가 없습니다.</div>;
    }

    // 슬라이더 컨테이너의 고정 높이 설정
    // 예: 높이를 500px로 고정
    const sliderContainerHeight = '500px'; // 또는 props.containerHeight 사용


    return (
        // 슬라이더 컨테이너에 고정 높이와 relative 클래스 적용
        // max-w-4xl 등 너비 제한 클래스는 유지
        <div className="relative w-full h-[20rem] lg:h-[30rem] max-w-4xl mt-[2rem] overflow-hidden">
            {/* Image 컴포넌트에 fill={true} 및 objectFit 설정 */}
            {/* width, height, className="w-full h-auto" 속성은 제거합니다. */}
            <Image
                src={images[currentImageIndex]}
                alt={`Slide ${currentImageIndex + 1}`}
                fill={true} // 부모 요소의 크기에 맞춰 이미지를 채웁니다.
                // objectFit 속성으로 이미지가 채워지는 방식을 제어합니다.
                // cover: 비율을 유지하며 부모 영역을 완전히 덮습니다. 이미지가 잘릴 수 있습니다.
                // contain: 비율을 유지하며 부모 영역 안에 완전히 표시됩니다. 영역이 남을 수 있습니다.
                // fill: 부모 영역에 맞춰 늘어납니다. 이미지 비율이 깨질 수 있습니다.
                objectFit="cover" // 이미지가 깨지지 않고 영역을 채우도록 cover 사용
            />

            {/* 이전/다음 버튼 및 점 네비게이션은 z-index를 Image보다 높게 설정해야 합니다. */}
            {/* Image 컴포넌트가 fill={true}일 때 기본 z-index가 높을 수 있으므로, 버튼/점의 z-index를 더 높게 설정합니다. */}
            {/* 예: z-20 */}

            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPreviousImage}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100 z-20" // z-index 조정
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={goToNextImage}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100 z-20" // z-index 조정
                    >
                        {">"}
                    </button>
                </>
            )}

            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20"> {/* z-index 조정 */}
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-black' : 'bg-gray-500'}`}
                            onClick={() => setCurrentImageIndex(index)}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
}
