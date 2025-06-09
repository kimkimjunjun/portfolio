import Link from "next/link";

export default function Conclusion() {
    return (
        <div className="lg:flex mx-[2rem] pt-[2rem] lg:pt-[5rem] h-[36rem] md:h-screen items-center lg:mb-0">
            <div className="flex flex-col lg:ml-[3rem] h-full">
                <h1 className="text-[2rem] lg:text-[4rem] font-bold">THANK YOU</h1>
                <div className="flex flex-col text-[0.6rem] lg:text-[1rem] font-medium">
                    <span className="">현재 프론트엔드 개발 역량 강화를 위해 효율적인 사용자 경험 제공과 문제 해결 능력, 그리고 성장에 집중하고 있습니다. </span>
                    <span className="">항상 배워가는 자세로 임하고 있으며, 새로운 것에 대한 도전을 두려워하지 않고 꾸준히 발전하는 개발자로 나아가겠습니다. </span>

                </div>
                <Link
                    href="https://github.com/kimkimjunjun"
                    className="
                    relative inline-block w-fit h-[5rem] md:h-[4.5rem] text-[2rem] font-semibold my-[2rem] border-b-2 border-black overflow-hidden transition-colors duration-300 text-black before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0 before:bg-black before:transition-[height] before:duration-300 before:ease-in-out before:z-0 hover:text-white hover:before:h-full
                "
                >
                    <span className="relative z-10 px-[1rem]">
                        GitHub
                    </span>
                </Link>
                <div className="h-full flex flex-col justify-end text-center lg:text-start text-[0.55rem] lg:text-[1rem] pb-[3rem] lg:pb-[2rem] font-medium">
                    <p>© 2025. 김준휘 All rights reserved</p>
                    <p>NEXT.JS 환경 TypeScript 및 TailWindCSS를 기반으로 제작된 웹사이트입니다.</p>
                </div>
            </div>

        </div>
    )
}