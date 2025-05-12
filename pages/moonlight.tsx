import Slider from '@/components/slider';
import Backbutton from '@/components/backbutton';
import { useState } from 'react';
import DeatilSection from '@/components/project/detailsection';

const sliderImages = [
    '/images/muin.png',
];

const projectsData = [
    {
        title: "▶ 카메라 움직임 감지",
        details: [
            "- Tapo카메라를 바탕으로 해당 화면에 물체가 움직임이 발생했을때 자동적으로 태블릿과 화상통화되는 방식으로 구현",
            "- 실시간 움직임 감지를 안하더라도 버튼을 만들어 임의적으로 화상통화 연결 가능",
        ]
    },
    {
        title: "▶ 태블릿과의 화상통화",
        details: [
            "- Agora SDK를 사용하여 화상통화 구현",
            "- 처음 접속 시 마이크 음소거가 되어 있으며, 버튼을 꾹 누르고 있을때에만 마이크가 되도록 구현"
        ]
    },
    {
        title: "▶ 보관함 원격 잠금해제",
        details: [
            "- 숙박업소에 비치된 잠금장치가 내재된 보관함을 원격으로 잠금해제하도록 구현",
            "- 실시간으로 잠금해제를 하면 해당 보관함이 블루투스 연동으로 즉각적으로 열리는 방식으로 구현현"
        ]
    },
];

const skillsData = [
    {
        title: "▶ 화상통화를 위한 WebRTC",
        details: [
            "- WebRTC 기술을 제공하는 Agora SDK로 실시간으로 화상통화 구현",
            "- 기존 WebRTC는 IP 주소를 얻기 위해 각각 TURN/STUN 서버를 유지 관리하지만 Agora SDK는 이 모든 작업을 추상화하여 작업해서 관리해야하는 하드웨어 오버헤드를 줄여 프로세스 최적화"
        ]
    },
    {
        title: "▶ OpenCV 기반 카메라 움직임 처리",
        details: [
            "- rtsp를 바탕으로 ffmpeg로 카메라 영상을 웹에서 송출하도록 구현하다가 실제 카메라와 3초 이상 딜레이가 생기는 것을 발견",
            "- OpenCV 라이브러리를 사용하여 직전 프레임과 현재 프레임 간의 차이를 계산하여 일정 값보다 크게 나올 경우 움직임 감지가 되도록 구현",
            "- 프레임 간 차이를 바탕으로 구현하여 카메라 영상이 늦게 송출이 되어도 즉각적으로 움직임 감지를 처리할 수 있음"
        ]
    },
    {
        title: "▶ 화상통화 이미지 캡쳐",
        details: [
            "- WebRTC로 구현한 화상통화의 고유값을 바탕으로 해당 화상통화 화면을 이미지 파일로 변환 후 저장하는 방식으로 캡쳐기능 구현",
        ]
    },
];

const trubleData = [
    {
        title: "▶ OpenCV 라이브러리",
        details: [
            "발생문제:",
            "- 직전 프레임과 현재 프레임 값을 바탕으로 큰 차이가 날때마다 움직임 감지가 되도록 구현했지만 움직임이 없을때도 움직임 감지 호출이 되는 이슈 발생",

            "발생원인:",
            "- 초기에 구현한 프레임 간 차이 기반 움직임 감지는 영상의 픽셀 값 변화가 일정 임계치를 넘으면 움직임으로 감지되도록 만듬. 하지만 해당 숙박업소 환경에서 조명의 미세한 변화나 깜빡임 등이 특정 위치의 프레임 간 픽셀 값 변화를 유발했고, 이 변화가 움직임 감지 임계값을 넘어서면서 실제 움직임이 없어도 움직임 감지가 된 것으로 판단됨",


            "해결방법:",
            "- 카메라 전체 화면에서 손님이 들어오거나 나갈때 지나칠 화면부분만 짤라서 움직임 감지 처리함",

            "결과:",
            "- 이전에 움직임이 없어도 감지가되는 문제가 해결되고 사물이나 물체가 움직임이 있어야만 감지가 됨",

            "배운점:",
            "- 카메라 rtsp값을 바탕으로 ffmpeg을 사용하였는데 rtsp에서 hls변환처리 과정이 있다보니 어쩔수 없는 딜레이가 발생하는 것을 알게됨",
            "- 영상 전체를 대상으로 처리하는 것보다 분석에 필요한 특정 영역(ROI)만을 지정하여 처리하는 것이 성능과 정확도 면에서 훨씬 효율적이라는 것을 알게됨"
        ]
    },
];

const boldKeywords = ["발생문제:", "발생원인:", "해결방법:", "결과:", "배운점:"];

export default function Moonlight() {
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
