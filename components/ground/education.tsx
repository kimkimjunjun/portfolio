export default function Education() {
    return (
        <div className="mx-[2rem] lg:ml-[5rem] mt-[1rem] lg:mt-0">
            <h1 className="text-[2rem] lg:text-[4rem] font-bold">학력사항</h1>
            <div>
                <div className="2xl:w-[70rem] xl:w-[61rem] flex items-center mt-[2rem]">
                    <span className="text-[1rem] lg:text-[2rem] font-bold">HANYANG UNIVERSITY ERICA</span>
                    <span className="text-[0.5rem] lg:text-[1.2rem] ml-auto text-gray-400">2021.03 ~ 2025.08</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[1rem] lg:text-[1.5rem]">소프트웨어융합대학 컴퓨터학부</span>
                    <span className="text-[1rem] lg:text-[1.5rem] text-gray-500">졸업 예정</span>
                </div>
                <div className="2xl:w-[70rem] xl:w-[61rem] flex items-center mt-[2rem]">
                    <span className="text-[1rem] lg:text-[2rem] font-bold">KYUNGHEE HIGH SCHOOL</span>
                    <span className="text-[0.5rem] lg:text-[1.2rem] ml-auto text-gray-400">2014.03 ~ 2017.02</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[1rem] lg:text-[1.5rem]">자연계열 이과</span>
                    <span className="text-[1rem] lg:text-[1.5rem] text-gray-500">졸업</span>
                </div>
            </div>
        </div>
    )
}