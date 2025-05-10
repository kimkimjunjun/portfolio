import Image from "next/image";
import intro from "@/public/images/intro.jpg"

export default function Introduction() {
    return (
        <div className="lg:flex ml-[2rem] lg:ml-[5rem] mt-[2rem] lg:mt-[5rem] h-[16rem] items-center mb-[4rem] lg:mb-0">
            <Image className="rounded-full w-[12rem] lg:w-[18rem] h-[12rem] lg:h-[18rem] mx-auto lg:mx-0" src={intro} alt="" />
            <div className="flex flex-col justify-center text-center lg:text-left lg:ml-[3rem]">
                <h1 className="text-[2rem] lg:text-[4rem] font-bold">JUN HWI KIM</h1>
                <div className="flex flex-col text-[0.6rem] lg:text-[1rem] font-medium">
                    <span className="">사용자 친화적인 웹 경험을 만드는 것을 지향하고 있습니다.</span>
                    <span className="">실제 창업 경험을 바탕으로 목표 성공에 향하는 강한 열정을 가지고 있습니다.</span>
                    <span className="">
                        TEL. <a className="font-bold">010-5035-3852</a> | E-MAIL. <a className="font-bold">WNSGNL323@GMAIL.COM</a> <span className="block lg:inline">
                            | ADDRESS. <a className="font-bold">234, Yeondong-ro, Guro-gu, Seoul</a>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}