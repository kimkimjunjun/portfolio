export default function Skill() {
    return (
        <div className="mx-[2rem] lg:ml-[5rem]">
            <h1 className="text-[2rem] lg:text-[4rem] font-bold">기술스택</h1>
            <div className="2xl:w-[70rem] xl:w-[61rem] mt-[2rem] flex flex-wrap mb-[1rem]">
                <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" />
                <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
                <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" />
                <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
                <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
                <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white" />
                <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white" />
            </div>
            <span className="text-[0.7rem] md:text-[1.2rem] leading-relaxed">
                - Axios 사용하여 비동기 통신방법 이해 및 코드 활용 가능<br />
                - props, context, Redux 이해 및 코드 활용 가능<br />
                - useMemo 및 useCallback 이해 및 코드 활용 가능<br />
                - recoil 활용한 전역변수처리 이해 및 코드 활용 가능<br />
                - localStorage, sessionStorage, js-cookie 기반 데이터 저장 및 활용 가능<br />
                - TailWind, Styled-components 기반 반응형 웹 UI/UX 최적화<br />
                - 커스텀 훅을 사용하여 불필요한 코드 반복 제거
            </span>
        </div>
    )
}