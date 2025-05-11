import Slider from '@/components/slider';
import Backbutton from '@/components/backbutton';
import { useState } from 'react';

const images = [
    '/images/slides/1.png',
    '/images/slides/2.png',
    '/images/slides/3.png',
    '/images/slides/4.png',
    '/images/slides/5.png',
];

// Project 항목 데이터를 정의합니다.
// 이 배열은 해당 컴포넌트 파일 내부에 두거나, 별도의 데이터 파일로 분리할 수 있습니다.
const projectsData = [
    {
        title: "▶ 로그인 시 FCM 토큰 발급 및 Firebase 저장을 통한 실시간 알림 기능",
        details: [
            "- FCM SDK로 발급받은 토큰과 사용자 식별자를 바탕으로 알림 발생 시 Firebase FCM 서비스를 통해 해당 토큰으로 메시지를 발송하도록 구현",
            "- 회원가입은 사용자 로그인 시 확인된 역할/권한 정보를 바탕으로 관리자에게만 해당 기능을 노출하고, 요청 수신 시 인증된 사용자의 권한을 재확인하는 보안 절차 적용",
            "- 권한이 확인된 관리자의 요청에 따라 신규 사용자 계정을 생성하고 필요한 데이터베이스에 정보를 저장하는 방식으로 구현"
        ]
    },
    {
        title: "▶ 챗봇 자동 응답데이터 활용 및 데이터 시각화를 통한 그래프 구현",
        details: [
            "- 실시간으로 수집되는 챗봇 자동 응답 데이터를 효과적인 데이터 처리 및 시각화 기술을 활용하여 동적인 그래프 형태로 구현",
            "- 객실에서 발생하는 주문 및 응답과 같은 이벤트를 FCM 실시간 알림을 통해 즉각적으로 감지하고, 해당 객실의 가격 및 관련 건수를 화면에 자동으로 반영하는 동적 업데이트 기능을 구축하여 사용자 경험 개선"
        ]
    },
    {
        title: "▶ LLM 기반 챗봇 독스",
        details: [
            "- LLM 기반으로 각 부서별 서비스 관련 문서 내용을 분석하여 문서에 기반한 정확하고 실시간으로 자동 응답을 제공하는 지능형 챗봇 기능 구현",
            "- 서비스 문서 콘텐츠는 기존의 데이터베이스 저장 방식 대신 Docker 환경 내부나 연결된 파일 시스템에 직접 관리되며, 챗봇이 응답 생성에 필요한 문서를 요청할 때 해당 Docker 환경으로부터 실시간으로 효율적으로 문서를 읽어와 LLM이 활용할 수 있도록 시스템 아키텍처 설계"
        ]
    },
    {
        title: "▶ 고객 요청 시 챗봇 화면 및 직원 채팅방 구현",
        details: [
            "- 객실 요청사항 리스트 항목을 클릭했을 때, 해당 객실 채팅 화면의 특정 메시지로 클라이언트 측 라우팅을 활용하여 페이지 전환 없이 즉시 이동하고, 지정된 메시지 위치로 부드럽게 스크롤되는 JavaScript 스크롤 이벤트 및 DOM 조작을 통해 사용자 편의성 높임",
            "- 주기적으로 서버를 확인하는 폴링 방식을 통해 다른 직원들의 화면에 업데이트되어, 근무자들 간에 신속하게 정보를 공유할 수 있는 소통 창구 마련"
        ]
    }
];


export default function Rosegold() {
    const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

    const handleTitleClick = (index: number) => {
        const newOpenIndices = new Set(openIndices);

        if (newOpenIndices.has(index)) {
            newOpenIndices.delete(index);
        } else {
            newOpenIndices.add(index);
        }

        setOpenIndices(newOpenIndices);
    };


    return (
        <div className="flex flex-col pt-[2rem] mb-[10rem]">
            <Backbutton />
            <div className='mx-[1rem]'>
                <h1 className='text-[1.5rem] md:text-[4rem] font-bold'>숙박업소 관리 플랫폼 - 로즈골드</h1>
                <h2 className='text-[1rem] md:text-[1.5rem]'>LLM을 활용한 고객 대응 자동화 및 수많은 객실들을 간편하게 관리하는 플랫폼</h2>
            </div>
            <Slider />
            <div className="mt-[1rem] text-left flex flex-col mx-[1rem] lg:w-[56rem]">
                <h1 className='text-[2rem] font-semibold'>[구현 내용]</h1>
                <div>
                    {projectsData.map((project, index) => {
                        const isOpen = openIndices.has(index);

                        const titleTextWithoutIcon = project.title.replace("▶ ", ""); // "▶ " 부분을 제거한 텍스트

                        return (
                            <div key={index} className='my-[0.5rem]'>
                                <h2
                                    className='text-[1.2rem] font-medium w-fit cursor-pointer'
                                    onClick={() => handleTitleClick(index)}
                                    aria-expanded={isOpen}
                                >
                                    {isOpen ? "▼ " : "▶ "}
                                    {titleTextWithoutIcon}
                                </h2>
                                <div
                                    className={`
                                        overflow-hidden
                                        transition-[max-height,opacity] duration-500 ease-in-out
                                        ${isOpen ? 'max-h-[500px]' : 'max-h-0'}
                                        ${isOpen ? 'opacity-100' : 'opacity-0'}
                                        ${isOpen ? 'pt-2' : 'pt-0'}
                                    `}
                                >
                                    <ul className='text-[1rem]'>
                                        {project.details.map((detail, detailIndex) => (
                                            <li key={detailIndex} >
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
