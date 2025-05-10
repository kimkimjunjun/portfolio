import Link from "next/link";

export default function Conclusion() {
    return (
        <div className="lg:flex mx-[2rem] pt-[2rem] lg:pt-[5rem] h-screen items-center lg:mb-0">
            <div className="flex flex-col lg:ml-[3rem] h-fit">
                <h1 className="text-[2rem] lg:text-[4rem] font-bold">THANK YOU</h1>
                <div className="flex flex-col text-[0.6rem] lg:text-[1rem] font-medium">
                    <span className="">현재 프론트엔드 개발 역량 강화를 위해 효율적인 사용자 경험 제공과 문제 해결 능력, 그리고 성장에 집중하고 있습니다. </span>
                    <span className="">아직 부족한 점이 있으나, 목표 달성을 향해 끈기 있게 실행하며 꾸준히 발전하는 개발자로 나아가겠습니다.</span>

                </div>
                <Link
                    href="https://github.com/kimkimjunjun"
                    className="
                    relative                      /* 가상 요소의 위치 기준 설정 */
                    inline-block                  /* 가상 요소가 부모의 크기에 맞게 설정되도록 */
                    w-fit                         /* 내용물 너비에 맞춤 */
                    text-[2rem] font-semibold my-[2rem] /* 텍스트 스타일 */
                    border-b border-black         /* 초기 밑줄 테두리 */
                    overflow-hidden               /* 애니메이션 중 가상 요소가 넘치지 않도록 숨김 */
                    transition-colors duration-300 /* hover 시 텍스트 색상 변경 애니메이션 */

                    /* 기본 텍스트 색상 명시 (필요시) */
                    text-black

                    /* --- 가상 요소 (::before) 스타일 --- */
                    /* content 속성은 비워둡니다. 텍스트는 가상 요소에 넣지 않습니다. */
                    before:content-['']           
                    before:absolute               
                    before:bottom-0 before:left-0 
                    before:w-full                 
                    before:h-0                    /* 초기 높이 0 */
                    before:bg-black               /* 배경색 검은색 */
                    before:transition-[height] before:duration-300 before:ease-in-out /* 높이 변화 애니메이션 */
                    before:z-0                    /* 가상 요소를 뒤에 배치 */

                    /* --- hover 시 스타일 --- */
                    hover:text-white              /* hover 시 텍스트 색상을 흰색으로 변경 */
                    hover:before:h-full           /* hover 시 가상 요소의 높이를 100%로 설정 */
                "
                >
                    {/* 텍스트 콘텐츠를 span으로 감싸고 z-index를 적용하여 앞으로 나오게 합니다. */}
                    <span className="relative z-10"> {/* relative와 z-10을 추가했습니다. */}
                        Github
                    </span>
                </Link>

            </div>
        </div>
    )
}