import Slider from '@/components/slider';
import Backbutton from '@/components/backbutton';
import { useState } from 'react';
import DeatilSection from '@/components/project/detailsection';

const sliderImages = [
    '/images/slides/1.png',
    '/images/slides/2.png',
    '/images/slides/3.png',
    '/images/slides/4.png',
    '/images/slides/5.png',
];

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

const skillsData = [
    {
        title: "▶ FCM Token을 활용한 실시간 웹페이지 알림",
        details: [
            "- 실시간 알림 시스템을 구축하여 손님의 요청사항이 직원에게 즉시 전달되도록 함으로써, 신속하고 효율적인 고객 응대 프로세스 마련",
            "- 직원이 해당 사이트를 이용 중이 아니더라도 백그라운드 및 포그라운드 환경 모두에서 알림이 정상적으로 표시되도록 구현",
        ]
    },
    {
        title: "▶ CI/CD 및 자동 배포 환경 구축",
        details: [
            "- Github Actions와 CI/CD 파이프라인을 활용하여 자동화된 배포 프로세스 구축",
            "- 코드 변경 사항이 있을 시 신속하게 처리할 수 있도록 배포 환경 구축"
        ]
    },
];

const trubleData = [
    {
        title: "▶ FCM Token 웹페이지 알림",
        details: [
            "발생문제:",
            "- 정상적으로 FCM토큰을 발급받도록 코드를 구현했지만 토큰값이 정상적으로 생성이 안되는 문제가 발생",

            "발생원인:",
            "- FCM 메시징 부분은 클라이언트 환경에 의존적인 부분을 간과하여 SSR(Server Side Rendering) 환경에서 직접 실행하려고 시도를 하여 정상적으로 토큰발급이 안되는 것을 확인",

            "해결방법:",
            "- FCM 토큰을 발급하는 과정에서 해당 코드에 SSR을 사용한게 아닌 클라이언트 사이드에서만 실행되도록 useEffect 훅을 사용하여 분리하고 서비스 워커 API가 지원되는 브라우저 환경인지도 확인하는 조건문을 추가함",

            "결과:",
            "- 정상적으로 FCM 토큰 발급이 되어 해당 토큰을 쿠키데이터에 저장 후 사용되도록 구현하여 로그인 시 해당 API 호출을 하여 실시간 알림이 뜨도록 구현함",

            "배운점:",
            "- Next.js가 서버와 클라이언트 양쪽에서 코드를 실행할 수 있다는 특징과, 이로 인해 브라우저 전용 API에 접근하는 코드를 다룰 때 발생하는 문제를 명확히 이해함",
            "- FCM과 같은 웹 푸시 알림 기능을 구현할 때 서비스 워커가 필수적이며, navigator.serviceWorker.register를 통해 서비스 워커를 올바르게 등록하는 과정이 중요하다는 걸 알게됨"
        ]
    },
];

const boldKeywords = ["발생문제:", "발생원인:", "해결방법:", "결과:", "배운점:"];

export default function Rosegold() {
    const [openProjectIndices, setOpenProjectIndices] = useState<Set<number>>(new Set());
    const [openSkillIndices, setOpenSkillIndices] = useState<Set<number>>(new Set());
    const [openTrubleIndices, setOpenTrubleIndices] = useState<Set<number>>(new Set());

    const handleProjectTitleClick = (index: number) => {
        const newOpenIndices = new Set(openProjectIndices);
        if (newOpenIndices.has(index)) {
            newOpenIndices.delete(index);
        } else {
            newOpenIndices.add(index);
        }
        setOpenProjectIndices(newOpenIndices);
    };

    const handleSkillTitleClick = (index: number) => {
        const newOpenIndices = new Set(openSkillIndices);
        if (newOpenIndices.has(index)) {
            newOpenIndices.delete(index);
        } else {
            newOpenIndices.add(index);
        }
        setOpenSkillIndices(newOpenIndices);
    };

    const handleTrubleTitleClick = (index: number) => {
        const newOpenIndices = new Set(openTrubleIndices);

        if (newOpenIndices.has(index)) {
            newOpenIndices.delete(index);
        } else {
            newOpenIndices.add(index);
        }
        setOpenTrubleIndices(newOpenIndices);
    };

    const renderDetailWithBoldKeyword = (detail: string) => {
        for (const keyword of boldKeywords) {
            if (detail.startsWith(keyword)) {
                const restOfText = detail.substring(keyword.length);
                return (
                    <>
                        <strong>{keyword}</strong>
                        {restOfText}
                    </>
                );
            }
        }
        return detail;
    };

    return (
        <div className="flex flex-col pt-[2rem] mb-[10rem]">
            <Backbutton />
            <div className='mx-[1rem]'>
                <h1 className='text-[1.5rem] md:text-[4rem] font-bold'>숙박업소 관리 플랫폼 - 로즈골드</h1>
                <h2 className='text-[1rem] md:text-[1.5rem]'>LLM을 활용한 고객 대응 자동화 및 수많은 객실들을 간편하게 관리하는 플랫폼</h2>
                <span className='text-[0.8rem]'>개발환경: TYPESCRIPT | NEXT.JS | REACT-QUERY | RECOIL | TAILWIND</span>
            </div>
            <Slider images={sliderImages} />
            <DeatilSection
                projectsData={projectsData}
                openProjectIndices={openProjectIndices}
                handleProjectTitleClick={handleProjectTitleClick}
                skillsData={skillsData}
                openSkillIndices={openSkillIndices}
                handleSkillTitleClick={handleSkillTitleClick}
                trubleData={trubleData}
                openTrubleIndices={openTrubleIndices}
                handleTrubleTitleClick={handleTrubleTitleClick}
                renderDetailWithBoldKeyword={renderDetailWithBoldKeyword} />
        </div>
    );
}
