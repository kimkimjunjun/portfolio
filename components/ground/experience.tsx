export default function Experience() {
    return (
        <div className="mx-[2rem] lg:ml-[5rem]">
            <h1 className="text-[2rem] lg:text-[4rem] font-bold">경력사항</h1>
            <div className="2xl:w-[70rem] xl:w-[61rem]">
                <div className="flex items-center lg:mt-[2rem]">
                    <span className="text-[1.4rem] lg:text-[2rem] font-medium">(주) 슬기로운낭만지기</span>
                    <span className="text-[0.5rem] lg:text-[1.2rem] ml-auto text-gray-400">2023.12 ~ 2025.02</span>
                </div>
                <div className="flex flex-col text-[1.2rem]">
                    <span className="text-[1.2rem] lg:text-[1.5rem]">LLM을 활용한 숙박업소 관리 플랫폼</span>
                    <span>근무 형태 | 프리랜서</span>
                    <div className="text-gray-500 flex flex-col grow">
                        <span className="mt-[0.5rem]">■ 업무 내용</span>
                        <span>1. 숙박업소 매니지먼트</span>
                        <span className="ml-[1rem] text-[0.9rem] md:text-[1.2rem]">- 직원들의 원활한 투숙객 관리 및 실시간 요청사항 관리 시스템 개발</span>
                        <span>2. 숙박업소 각 객실별 챗봇</span>
                        <span className="ml-[1rem] text-[0.9rem] md:text-[1.2rem]">- LLM을 활용한 인공지능 AI 챗봇 및 객실 내 주문시스템 구현</span>
                        <span>3. 숙박업소 무인 관제</span>
                        <span className="ml-[1rem] text-[0.9rem] md:text-[1.2rem]">- 카메라 움직임 기반 WebRTC 화상통화 구현</span>
                        <span className="mt-[0.5rem]">■ 주요 성과</span>
                        <span className=" text-[0.9rem] md:text-[1.2rem]">- 숙박업 직원들이 보다 편리하게 투숙객 관리를 하기 위한 UI 구현과 DB와 Docker의 데이터를 따로 처리하여 LLM 문서 데이터가 DB에 들어가지 않고, Docker에 있는 데이터를 불러와 수정기능을 구현하였습니다. 실제 데이터 반영하는 데에 시간이 걸려 데이터 처리하는 동안 로딩 처리를 하여 안정적인 렌더링 과정을 구현하였습니다.</span>
                        <span className=" text-[0.9rem] md:text-[1.2rem]">- 외국인 방문객들이 많은 숙박업소를 위한 i18n 다국어처리 기능을 구현하여 외국인들이 보다 숙박업 서비스에 만족할 수 있는 편의성을 제공하였고, LLM 문서기반 데이터를 사용하여 해당 숙박업소가 제공하는 서비스들을 AI 챗봇을 통하여 자동응답하는 챗봇을 구현하였습니다.</span>
                        <span className="mt-[0.5rem]">■ 기술 스택</span>
                        <span className=" text-[0.9rem] md:text-[1.2rem]">TYPESCRIPT | NEXT.JS | REACT-QUERY | RECOIL | TAILWIND</span>
                    </div>
                </div>
            </div>
        </div>
    )
}