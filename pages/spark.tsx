import Slider from '@/components/slider';
import Backbutton from '@/components/backbutton';
import { useState } from 'react';
import DeatilSection from '@/components/project/detailsection';

const sliderImages = [
    '/images/slides/spark1.png',
    '/images/slides/spark2.png',
    '/images/slides/spark3.png',
];

const projectsData = [
    {
        title: "▶ 로그인 및 회원가입",
        details: [
            "- 로그인 시 localStorage를 활용하여 유저데이터 저장",
            "- JWT 토큰으로 사용자 인증 및 권한 관리 로직을 바탕으로 회원가입 시 토큰을 발급하여 로그인 상태 유지 및 보안이 필요한 페이지 접근 제어",
        ]
    },
    {
        title: "▶ 게시글 CRUD 및 북마크 기능",
        details: [
            "- 게시글 상세 내용을 모달 컴포넌트로 구현하여, 필요한 데이터만 비동기적으로 로드함으로써 불필요한 네트워크 트래픽 최소화",
            "- 게시글 작성 시 이미지파일들의 우선순위를 바꾸기 위한 react-dnd 라이브러리 활용"
        ]
    },
    {
        title: "▶ react-slick 및 추천 게시글",
        details: [
            "- 전체 게시글 중 추천이 제일 많은 게시글을 react-slick 라이브러리를 활용하여 대표 슬라이드 구현",
            "- 카테고리 별 게시글 추천 기능 구현"
        ]
    },
];

const skillsData = [
    {
        title: "▶ 유저 데이터 영속성 관리 및 접근",
        details: [
            "- 로그인한 유저데이터를 가져오는 함수를 accessToken과 함께 컴포넌트화시켜 코드 간소화",
        ]
    },
    {
        title: "▶ 커스텀 훅을 사용하여 코드 가독성 증가",
        details: [
            "- 중복으로 자주 사용되는 데이터 및 상태관리를 커스텀 훅으로 만들어 반복적인 코드가 없도록 설정",
        ]
    },
    {
        title: "▶ 게시글 작성 시 이미지 순서변경",
        details: [
            "- react-dnd를 활용하여 올린 이미지 리스트들의 순서를 드래그로 통해 바꿀수 있도록 구현",
        ]
    },
    {
        title: "▶ 게시글 이미지 로딩 로직 개선을 통한 페이지 안정성 확보",
        details: [
            "- 모바일 회원가입 페이지에 잦은 페이지 이동이 있는 부분에 CLS를 사용하여 버튼 클릭 오류 방지",
            "- 페이지 요소들이 로딩 완료 후 갑자기 나타나거나 위치를 변경하는 것을 방지"
        ]
    },
];

const trubleData = [
    {
        title: "▶ 특정 게시글 이미지 깨짐 현상",
        details: [
            "발생문제:",
            "- 게시글 CRUD 기능을 개발 및 테스트하는 과정에서, 일부 게시글에 포함된 이미지가 웹과 모바일 환경 모두에서 정상적으로 렌더링되지 않는 문제 발생",

            "발생원인:",
            "- 게시글 데이터를 확인해보니 이미지 데이터가 없는 것을 알게되고, 업로드한 이미지 파일들의 용량이 커서 파일 전송이 완료되기 전에 게시글 작성이 먼저 처리되어 발생한 것으로 확인됨",


            "해결방법:",
            "- 이미지 업로드 과정을 개선하여, 파일 전송이 완전히 완료되고 서버로부터 성공 응답을 받을 때까지 게시글 작성 버튼을 비활성화하고 로딩 상태를 표시하도록 클라이언트 로직을 수정함",

            "결과:",
            "- 모든 게시글에 이미지가 누락 없이 정상적으로 포함되었으며, 웹과 모바일 환경에서 이미지가 안정적으로 렌더링되는 것을 확인함",

            "배운점:",
            "- 비동기적으로 처리되는 파일 업로드와 게시글 정보 저장 간의 동기화 및 유효성 검사의 중요성을 알게됨",
            "- 잠재적인 문제 발생 가능성이 있는 부분에 대한 사전 테스트와 오류 처리 로직 설계가 개발에 필수적인 것을 알게됨"
        ]
    },
];

const boldKeywords = ["발생문제:", "발생원인:", "해결방법:", "결과:", "배운점:"];

export default function Spark() {
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
        <div className="flex flex-col pt-[1rem] md:pt-[2rem] mb-[10rem] items-center">
            <Backbutton />
            <div className='mx-[1rem]'>
                <h1 className='text-[1.5rem] md:text-[3.5rem] font-bold'>한양대 ERICA 디자인대학 졸업전시회</h1>
                <h2 className='text-[1rem] md:text-[1.5rem]'>한양대 ERICA 디자인대학 학생들의 졸업작품을 온라인에서 전시해주는 사이트</h2>
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
