import rosemain from "@/public/images/rosemain.png"
import trippy from "@/public/images/trippy.png"
import spark from "@/public/images/spark.png"
import muin from "@/public/images/muin.png"
import Image from "next/image"
import Link from "next/link"

export default function Project() {
    return (
        <div className="mx-[2rem] lg:ml-[5rem]">
            <h1 className="text-[2rem] lg:text-[4rem] font-bold">프로젝트</h1>
            <div className="mt-[2rem] flex flex-wrap space-x-5 space-y-3">
                <Link href="/rosegold">
                    <div className={`w-[20rem] border border-gray-300 rounded-[4px] shadow-md hover:opacity-80 hover:-translate-y-2 duration-300`}>
                        <a className='block text-inherit no-underline hover:animate-moveUp' href='#'>
                            <div className='w-full relative'>
                                <Image className='top-0 left-0 w-full h-[170px] object-cover block rounded-t-md' src={rosemain} alt='' />
                            </div>
                        </a>
                        <div className={`p-4 flex-1 bg-white`}>
                            <a className='block text-inherit' href='#'>
                                <h4 className='text-[1rem] font-bold m-0 text-ellipsis'>숙박업소 관리 플랫폼</h4>
                                <div className='flex-1'>
                                    <p className='break-words text-[0.875rem] h-[3rem] text-ellipsis overflow-hidden'>LLM을 활용한 고객 대응 자동화 및 수많은 객실들을 간편하게 관리하는 플랫폼</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </Link>
                <Link href="/trippy">
                    <div className={`w-[20rem] border border-gray-300 rounded-[4px] shadow-md hover:opacity-80 hover:-translate-y-2 duration-300`}>
                        <a className='block text-inherit no-underline hover:animate-moveUp' href='#'>
                            <div className='w-full relative'>
                                <Image className='top-0 left-0 w-full h-[170px] object-cover block rounded-t-md' src={trippy} alt='' />
                            </div>
                        </a>
                        <div className={`p-4 flex-1 bg-white`}>
                            <a className='block text-inherit' href='#'>
                                <h4 className='text-[1rem] font-bold m-0 text-ellipsis'>여행지 정보 공유 및 날씨 추천 플랫폼</h4>
                                <div className='flex-1'>
                                    <p className='break-words text-[0.875rem] h-[3rem] text-ellipsis overflow-hidden'>한국관광공사 및 기상청 공공데이터를 활용하여 여행지 추천 및 후기를 공유할 수 있는 플랫폼</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </Link>
                <Link href="/spark">
                    <div className={`w-[20rem] border border-gray-300 rounded-[4px] shadow-md hover:opacity-80 hover:-translate-y-2 duration-300`}>
                        <a className='block text-inherit no-underline hover:animate-moveUp' href='#'>
                            <div className='w-full relative'>
                                <Image className='top-0 left-0 w-full h-[170px] object-cover block rounded-t-md' src={spark} alt='' />
                            </div>
                        </a>
                        <div className={`p-4 flex-1 bg-white`}>
                            <a className='block text-inherit' href='#'>
                                <h4 className='text-[1rem] font-bold m-0 text-ellipsis'>한양대 ERICA 디자인대학 졸업전시회</h4>
                                <div className='flex-1'>
                                    <p className='break-words text-[0.875rem] h-[3rem] text-ellipsis overflow-hidden'>한양대 ERICA 디자인대학 학생들의 졸업작품을 온라인에서 전시해주는 사이트</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </Link>
                <Link href="/moonlight">
                    <div className={`w-[20rem] border border-gray-300 rounded-[4px] shadow-md hover:opacity-80 hover:-translate-y-2 duration-300`}>
                        <a className='block text-inherit no-underline hover:animate-moveUp' href='#'>
                            <div className='w-full relative'>
                                <Image className='top-0 left-0 w-full h-[170px] object-cover block rounded-t-md' src={muin} alt='' />
                            </div>
                        </a>
                        <div className={`p-4 flex-1 bg-white`}>
                            <a className='block text-inherit' href='#'>
                                <h4 className='text-[1rem] font-bold m-0 text-ellipsis'>실시간 숙박업 무인 관제 시스템</h4>
                                <div className='flex-1'>
                                    <p className='break-words text-[0.875rem] h-[3rem] text-ellipsis overflow-hidden'>인건비 부담이 되는 숙박업소를 위한 정해진 시간동안 무인으로 운영 가능하도록 관제해주는 플랫폼</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}