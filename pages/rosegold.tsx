import Slider from '@/components/slider';
import Backbutton from '@/components/backbutton';

const images = [
    '/images/slides/1.png',
    '/images/slides/2.png',
    '/images/slides/3.png',
    '/images/slides/4.png',
    '/images/slides/5.png',
];

export default function Rosegold() {


    return (
        <div className="flex flex-col items-center pt-[2rem]">
            <Backbutton />
            <h1 className='text-[4rem]'>숙박업소 관리 플랫폼 - 로즈골드</h1>
            <Slider />
            <div className="mt-[1rem] text-left flex">
                <p className='text-left'>dd</p> {/* 원래 있던 내용 */}
            </div>
        </div>
    );
}
