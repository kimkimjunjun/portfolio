import Slider from '@/components/slider';
import Backbutton from '@/components/backbutton';
import { useState } from 'react';
import DeatilSection from '@/components/project/detailsection';

const sliderImages = [
    '/images/slides/trippy1.png',
    '/images/slides/trippy2.png',
    '/images/slides/trippy3.png',
    '/images/slides/trippy4.png',
    '/images/slides/trippy5.png',
];

const projectsData = [
    {
        title: "▶ 로그인 및 회원가입",
        details: [
            "- OAuth 2.0을 도입하여 인증 프로세스 간소화 및 사용자 편의성 제공",
            "- 쿠키 기반 인증을 통해 사용자의 인증 정보를 안전하게 저장하고 유지하며 회원가입 및 로그인 기능을 구현",
        ]
    },
    {
        title: "▶ 유저 맞춤 게시물 및 전체 게시물 조회",
        details: [
            "- 로그인한 유저의 관심사를 바탕으로 추천 티켓, OOTD 게시글이 보이도록 구현",
            "- Skeleton UI를 활용하여 데이터가 완전히 로드될때까지 자연스러운 로딩화면 구현"
        ]
    },
    {
        title: "▶ 티켓 글쓰기",
        details: [
            "- 5가지 이동 수단을 SVG 파일을 동적으로 활용하여 우선순위에 따라 위치시키고 선택 상태를 시각적으로 구분하여 사용자가 이동 수단을 인지하고 선택할 수 있도록 기능 구현",
            "- 글쓰기 에디터로 TinyMCE를 도입하여 글자 색상 및 정렬과 같은 주요 기능을 사용자 편의에 맞춰 최적화"
        ]
    },
    {
        title: "▶ 상세 게시글 조회 및 댓글 CRUD, 추천 관광지 기능",
        details: [
            "- TinyMCE 에디터를 통해 작성된 데이터를 바탕으로 게시글 조회하고 좋아요, 팔로우, 북마크 기능 구현",
            "- 댓글, 답글 기능으로 수정, 좋아요를 추가하고 시간 순으로 보이도록 구현",
            "- 여행 경로 데이터를 바탕으로 관련 지역의 추천 관광지 정보를 제공해주는 기능 구현"
        ]
    }
];

const skillsData = [
    {
        title: "▶ 소셜 로그인 도입 및 인증 정보 보안 강화",
        details: [
            "- 보안 강화를 위해 인증 정보를 Cookie에 저장",
            "- OAuth 2.0을 사용하여 네이버, 카카오, 구글 간편 회원가입 및 로그인 기능 구현",
        ]
    },
    {
        title: "▶ 게시글 및 댓글 CRUD 기능",
        details: [
            "- TinyMCE를 도입하여 사용자 편의에 맞는 게시글 작성, 수정, 삭제 기능 구현",
            "- 여행관련 소통을 위한 댓글 작성, 답글, 수정, 삭제 기능 구현"
        ]
    },
    {
        title: "▶ Debounce를 활용한 API 요청 횟수 최적화",
        details: [
            "- 검색 기능에서 사용자가 입력을 마치기 전까지 불필요한 API 요청 방지",
            "- 로그인 및 회원가입 입력 과정에 일치 불일치 관련 불필요한 서버 요청 최적화"
        ]
    },
    {
        title: "▶ 공공 데이터 기반 여행 정보 제공",
        details: [
            "- 한국관광공사에서 제공된 여행지 정보 바탕으로 추천 기능 구현",
            "- 날씨 공공데이터를 연동하여 선택한 여행지에 대한 실시간 날씨 정보 제공"
        ]
    },
];

const trubleData = [
    {
        title: "▶ OAuth 2.0 소셜 로그인",
        details: [
            "발생문제:",
            "- OAuth 2.0 프로토콜을 활용하여 소셜 로그인 및 회원가입 기능을 구현과정에서, 사용자 인증 후 애플리케이션으로 돌아오는 단계에서 redirect_uri_mismatch 오류가 발생했고, 이 오류로 인해 사용자가 인증 및 정보 제공에 동의했음에도 불구하고, 구현한 웹 애플리케이션의 콜백 URI로 정상적으로 리디렉션되지 않고 오류 페이지가 표시가 됨",

            "발생원인:",
            "- 애플리케이션 코드가 인증 요청 시 포함하여 보낸 redirect_uri의 값이, 해당 인증 서버의 개발자 콘솔에 미리 승인된 리디렉션 URI(Authorized Redirect URIs)값과 일치하지 않아서 발생하게 됨",


            "해결방법:",
            "- 소셜 로그인 버튼 클릭 시 실제로 전송되는 인증 요청의 redirect_uri 매개변수 값을 확인 후, 승인된 리디렉션 URI값과 일치하도록 처리",

            "결과:",
            "- 미리 설정된 애플리케이션의 redirect_uri로 정상적으로 리디렉션되었고, 애플리케이션은 인증 서버로부터 전달받은 액세스 토큰을 성공적으로 처리하여 소셜 로그인 및 회원가입이 정상적으로 진행됨",

            "배운점:",
            "- 코드를 직접 디버깅하는 것 외에 브라우저의 네트워크 탭을 활용하여 실제로 주고받는 HTTP 요청 및 응답이 어떻게 전송되는지를 직접 확인하는 것이 문제의 원인을 파악하는 데 큰 도움이 될 수 있다는 것을 알게 됨",
        ]
    },
    {
        title: "▶ TinyMCE 글쓰기 에디터",
        details: [
            "발생문제:",
            "- 해당 에디터로 글 작성 시 실제 글 내용에 <p> 같은 태그들이 나오며 글자스타일도 적용이 안되고 더불어 이미지 업로드 시 이미지의 순서가 에디터에서 보던 것과 다르게 뒤죽박죽으로 보이는 이슈 발생",

            "발생원인:",
            "- Tiny에디터는 내부적으로 HTML 태그를 포함한 문자열을 생성하는데 이걸 그대로 DB에 저장하여 서식을 지정하는 HTML 태그들이 브라우저에 의해 파싱되지 않고 글 내용의 일부처럼 그대로 노출이 됨",


            "해결방법:",
            "- 데이터베이스에 저장된 HTML 문자열을 프론트엔드에서 화면에 표시할 때, HTML 자체로 해석하여 렌더링하도록 뷰 컴포넌트의 코드를 수정",
            "- dangerouslySetInnerHTML 속성을 사용하여 저장된 HTML 문자열을 안전하게 삽입하고 브라우저가 이를 HTML로 파싱하도록 처리",

            "결과:",
            "- <p>, <strong>와 같은 HTML 태그들이 더 이상 글 내용에 그대로 노출되지 않고 정상적으로 파싱되어 적용됨",
            "- 이미지들도 삽입했던 순서대로 올바르게 표시되어 에디터에서 작성한 내용 그대로 나옴",

            "배운점:",
            "- 사용자 입력 기반의 리치 텍스트를 다룰 때, HTML과 화면 렌더링 방식 간의 연결성이 중요하다는 것을 알게 됨",
        ]
    },
];

const boldKeywords = ["발생문제:", "발생원인:", "해결방법:", "결과:", "배운점:"];

export default function Trippy() {
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
        <div className="flex flex-col pt-[1rem] md:pt-[2rem] mb-[10rem]">
            <Backbutton />
            <div className='mx-[1rem]'>
                <h1 className='text-[1.5rem] md:text-[3.5rem] font-bold'>여행지 정보 공유 및 날씨 추천 플랫폼</h1>
                <h2 className='text-[1rem] md:text-[1.5rem]'>한국관광공사 및 기상청 공공데이터를 활용하여 여행지 추천 및 후기를 공유할 수 있는 플랫폼</h2>
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
