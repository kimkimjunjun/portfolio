import Slider from '@/components/slider';
import Backbutton from '@/components/backbutton';
import { useState } from 'react';
import DeatilSection from '@/components/project/detailsection';

const sliderImages = [
    '/images/slides/chatbot.png',
    '/images/slides/chatbot1.png',
    '/images/slides/chatbot2.png',
    '/images/slides/chatbot3.png',
    '/images/slides/chatbot4.png',
];

const projectsData = [
    {
        title: "▶ LLM기반 인공지능 챗봇",
        details: [
            "- 각 호텔별로 저장된 LLM 챗봇 독스 바탕으로 상대방에게 모든 언어로 자동 응답 기능 구현",
            "- 채팅 질문 후 답변 생성 대기중에 메뉴판페이지 들어가는 것을 고려하여 recoil 바탕으로 전역 변수 처리",
        ]
    },
    {
        title: "▶ 주문시스템 및 장바구니 기능 구현",
        details: [
            "- recoil 라이브러리를 활용하여 장바구니 상태를 전역으로 효율적으로 관리하며 아이템 추가 및 수량 변경 기능을 구현",
            "- 주문 후 주문내역을 사이드바에 만들어 모달창으로 구현"
        ]
    },
];

const skillsData = [
    {
        title: "▶ i18n을 활용한 외국인 방문객들을 위한 다국어 처리 기능",
        details: [
            "- 외국인들에게 보다 편리한 서비스 제공을 위해 다국어처리 라이브러리 i18n 사용",
            "- 동적 라우팅을 사용할땐 static하게 생성할 페이지를 정하는 getStaticPaths함수를 사용해야 하는 것을 알게 되고 적용",
            "- getStaticProps함수를 사용하여 static 페이지 생성 후 해당 locales값을 props로 넘기는 방식으로 구현"
        ]
    },
    {
        title: "▶ 효율적인 주문처리를 위한 Recoil 전역 변수 처리 기능",
        details: [
            "- atom 함수를 사용하여 orderState와 같은 이름의 Atom을 생성하고 객체를 설정하여 주문된 상품 목록, 총액 등의 정보를 관리",
            "- 장바구니 담기 버튼, 장바구니 페이지에서 useRecoilState 훅을 사용하여 Atom의 현재 값과 그 값을 업데이트하는 함수를 동시에 가져와 사용",
        ]
    },
    {
        title: "▶ API 분산 처리 시스템",
        details: [
            "- 클라이언트의 GET 요청을 받아, 해당 데이터를 통해 다른 서버에 POST 요청을 전송하는 중계 시스템 개발",
            "- 독립적인 Docker 환경에서 운영되는 백엔드 서비스 간의 안전하고 효율적인 데이터 통신 구조 구축"
        ]
    },
];

const trubleData = [
    {
        title: "▶ React-i18next 라이브러리",
        details: [
            "발생문제:",
            "- React-i18next 라이브러리를 사용하여 다국어 처리 기능을 구현하였지만 로컬환경 내에선 정상적으로 번역되어 잘 나오지만 배포된 사이트에서 테스트한 결과 번역된 내용으로 안나오는 문제가 발생함",

            "발생원인:",
            "- 여러 호텔들을 대상으로 구현하다보니 동적 라우팅을 사용하였는데 이 부분에서 문제가 발생한 것으로 확인함. Next.js는 기본적으로 동적 라우트 패턴만 인식하고, 실제로 어떤 slug 값들이 사용될지, 그리고 어떤 locale에 대해 해당 slug의 페이지가 필요할지 알지 못하기 때문에, 클라이언트 사이드 렌더링 이후에 뒤늦게 언어 정보를 파악하게 됨. 이로 인해 초기 렌더링 시점에 올바른 언어가 적용되지 않거나, 라이브러리가 언어 정보를 제대로 가져오지 못하는 문제가 발생한 것으로 파악됨",


            "해결방법:",
            "- 동적 라우트에서 빌드 시 생성할 구체적인 경로 목록을 정의하기 위해 getStaticPaths 함수를 사용하고 이 함수 내에서 지원하는 모든 언어(locales)와 각 언어별로 생성해야 할 동적 페이지의 slug 값들을 조합하여 페이지들을 미리 만들도록 구현함. 예를 들어, 지원 언어가 영어('en')와 한국어('ko')이고 동적 페이지의 slug가 'test'이라면, /en/test과 /ko/test 경로에 대한 페이지를 생성하도록 설정",
            "- getStaticPaths에서 정의된 각 경로(locale과 slug 조합)에 대해 필요한 데이터를 가져오고, 특히 현재 페이지의 locale 정보를 props로 페이지 컴포넌트에 전달하기 위해 getStaticProps 함수를 사용하여 static 페이지 생성하도록 구현함",

            "결과:",
            "- getStaticPaths와 getStaticProps를 사용하여 빌드 시점에 각 언어 및 동적 slug에 맞는 정적인 페이지들을 미리 생성함으로써, 페이지 로드 시점에 이미 필요한 언어 정보가 준비되어 다국어 라이브러리가 정상적으로 작동하게 됨",

            "배운점:",
            "- 동적 라우트 페이지를 정적으로 미리 생성하기 위해서는 getStaticPaths 함수를 통해 구체적인 경로 목록을 명시적으로 지정해야 함을 깊이 이해함",
            "- 로컬에서는 문제가 없더라도 실제 빌드 및 배포 과정에서 SSR이나 SSG 관련 문제가 발생할 수 있음을 경험하며, 다양한 환경에서의 테스트 중요성을 알게됨"
        ]
    },
];

const boldKeywords = ["발생문제:", "발생원인:", "해결방법:", "결과:", "배운점:"];

export default function Chatbot() {
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
                <h1 className='text-[1.5rem] md:text-[4rem] font-bold'>실시간 숙박업 무인 관제 시스템</h1>
                <h2 className='text-[1rem] md:text-[1.5rem]'>인건비 부담이 되는 숙박업소를 위한 정해진 시간동안 무인으로 운영 가능하도록 관제해주는 플랫폼</h2>
                <span className='text-[0.8rem]'>개발환경: TYPESCRIPT | NEXT.JS | REACT-QUERY | TAILWIND</span>
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
