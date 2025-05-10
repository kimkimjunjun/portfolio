import Image from "next/image";
import { useRouter } from "next/navigation";
import backbutton from "@/public/images/backbutton.png";

export default function Backbutton() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <div className="w-full max-w-4xl px-[3rem] mb-[1rem]">
            <button
                onClick={handleGoBack}
                className="cursor-pointer flex items-center border-2 border-black rounded-[1rem] px-[1rem] hover:bg-gray-300"
            >
                <Image src={backbutton} alt='뒤로가기' width={40} height={20} /> {/* alt 속성 추가 */}
                <span className='text-[1.5rem] text-black ml-[1rem]'>
                    뒤로가기
                </span>
            </button>
        </div>
    )
}