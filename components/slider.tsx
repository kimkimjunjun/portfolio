import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SliderProps {
    images: string[];
}

export default function Slider({ images }: SliderProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );
        }, 5000);

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

    return (
        <div className="relative w-full max-w-4xl mt-[2rem] overflow-hidden">
            <Image
                src={images[currentImageIndex]}
                alt={`Slide ${currentImageIndex + 1}`}
                width={1000}
                height={500}
                className="w-full h-auto"
            // objectFit="cover"
            />

            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPreviousImage}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100 z-10"
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={goToNextImage}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100 z-10"
                    >
                        {">"}
                    </button>
                </>
            )}


            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
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
