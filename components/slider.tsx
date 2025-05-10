import Image from 'next/image';
import { useState, useEffect } from 'react'; // 상태와 이펙트 훅 임포트

const images = [
    '/images/slides/1.png',
    '/images/slides/2.png',
    '/images/slides/3.png',
    '/images/slides/4.png',
    '/images/slides/5.png',
];

export default function Slider() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 보여줄 이미지의 인덱스

    useEffect(() => {
        // 이미지가 1개 이하면 자동 슬라이드 비활성화
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            // 3초마다 다음 이미지로 이동
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length // 이미지 배열의 끝에 도달하면 처음으로 돌아갑니다.
            );
        }, 3000); // 3000ms (3초) 간격

        // 컴포넌트 언마운트 시 인터벌 클리어 (메모리 누수 방지)
        return () => clearInterval(interval);
    }, [images.length]); // images 배열의 길이가 변경될 때만 effect를 다시 실행

    // 다음 이미지로 이동하는 함수
    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % images.length
        );
    };

    // 이전 이미지로 이동하는 함수
    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length // 음수 인덱스 방지
        );
    };
    return (
        <div className="relative w-full max-w-4xl mt-[2rem] overflow-hidden"> {/* 슬라이드 컨테이너: 상대 위치, 최대 너비, 넘치는 부분 숨김, 상단 마진 */}
            <Image
                src={images[currentImageIndex]} // 현재 인덱스의 이미지 경로 사용
                alt={`Slide ${currentImageIndex + 1}`} // 이미지 대체 텍스트
                width={800} // 예시 너비 (컨테이너 너비와 비율 고려)
                height={500} // 예시 높이
                className="w-full h-auto" // Tailwind 클래스로 너비 100%, 높이 자동
                // fill={true} // 부모 크기에 맞추려면 이 옵션과 relative 부모 필요
                objectFit="cover" // fill 사용 시 이미지 비율 유지 방법
            />

            {/* 이전/다음 버튼 */}
            <button
                onClick={goToPreviousImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100 z-10" // 절대 위치, 세로 중앙 정렬, 스타일링
            >
                {"<"} {/* 이전 화살표 */}
            </button>
            <button
                onClick={goToNextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100 z-10" // 절대 위치, 세로 중앙 정렬, 스타일링
            >
                {">"} {/* 다음 화살표 */}
            </button>

            {/* (선택 사항) 점 네비게이션 추가 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-black' : 'bg-gray-500'}`}
                        onClick={() => setCurrentImageIndex(index)} // 점 클릭 시 해당 이미지로 이동
                    ></button>
                ))}
            </div>
        </div>
    )
}