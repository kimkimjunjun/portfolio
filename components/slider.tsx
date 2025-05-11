import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
interface SliderProps {
    images: string[];
}

export default function Slider({ images }: SliderProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);


    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);


    useEffect(() => {
        if (typeof window !== 'undefined' && emblaApi) {

            onInit(emblaApi);
            onSelect(emblaApi);

            emblaApi.on('select', onSelect);

            return () => {
                emblaApi.off('select', onSelect);
            };
        }

        return undefined;

    }, [emblaApi, onInit, onSelect]);


    const goToNextImage = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
    }, [emblaApi]);

    const goToPreviousImage = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (!emblaApi) return;
        emblaApi.scrollTo(index);
    }, [emblaApi]);


    if (!images || images.length === 0) {
        return <div>슬라이드 이미지가 없습니다.</div>;
    }


    return (
        <div className="group relative w-full h-[20rem] lg:h-[35rem] max-w-4xl mt-[2rem] overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
                {images.map((image, index) => (
                    <div className="relative h-full flex-[0_0_100%]" key={index}>
                        <Image
                            src={image}
                            alt={`Slide ${index + 1}`}
                            fill={true}
                            objectFit="cover"
                        />
                    </div>
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPreviousImage}
                        className="absolute px-[1rem] h-full left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white opacity-0 group-hover:opacity-100 hover:opacity-100 z-20 cursor-pointer transition-opacity duration-300"
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={goToNextImage}
                        className="absolute px-[1rem] h-full right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white opacity-0 group-hover:opacity-100 hover:opacity-100 z-20 cursor-pointer transition-opacity duration-300"
                    >
                        {">"}
                    </button>
                </>
            )}

            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === selectedIndex ? 'bg-black' : 'bg-gray-500'}`}
                            onClick={() => scrollTo(index)}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
}
