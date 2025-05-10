import rosemain from "@/public/images/rosemain.png"
import Image from "next/image"
import Link from "next/link"

export default function Project() {
    return (
        <div className="ml-[5rem]">
            <h1 className=" text-[4rem] font-bold">프로젝트</h1>
            <div className="mt-[2rem]">
                <Link href="/rosegold">
                    <div className={`w-[20rem] border border-gray-300 rounded-[4px] shadow-md hover:opacity-80 hover:-translate-y-2 duration-300`}>
                        <a className='block text-inherit no-underline hover:animate-moveUp' href='#'>
                            <div className='w-full relative'>
                                <Image className='top-0 left-0 w-full h-[170px] object-cover block rounded-t-md' src={rosemain} alt='' />
                            </div>
                        </a>
                        <div className={`p-4 flex-1 bg-white`}>
                            <a className='block text-inherit' href='#'>
                                <h4 className='text-[1rem] font-bold m-0 text-ellipsis'>숙박업소 관리 플랫폼 - 로즈골드</h4>
                                <div className='flex-1'>
                                    <p className='break-words text-[0.875rem] h-[3rem] text-ellipsis overflow-hidden'>LLM을 활용한 고객 대응 자동화 및 수많은 객실들을 간편하게 관리하는 플랫폼</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}