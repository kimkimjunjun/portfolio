import Image from "next/image";
import intro from "@/public/images/intro.jpg"

export default function Introduction() {
    return (
        <div className="flex ml-[5rem] mt-[5rem] h-[16rem]">
            <Image className="rounded-full" src={intro} alt="" width={250} height={250} />
            <div className="flex flex-col justify-center ml-[3rem]">
                <h1 className="text-[4rem] font-bold">JUN HWI KIM</h1>
                <div className="flex flex-col text-[1rem] font-medium">
                    <span className="">사용자 친화적인 웹 경험을 만드는 것을 지향하고 있습니다.</span>
                    <span className="">실제 창업 경험을 바탕으로 목표 성공에 향하는 강한 열정을 가지고 있습니다.</span>
                    <span className="">TEL. <a className="font-bold">010-5035-3852</a> | E-MAIL. <a className="font-bold">WNSGNL323@GMAIL.COM</a> | ADDRESS. <a className="font-bold">234, Yeondong-ro, Guro-gu, Seoul</a></span>
                </div>
            </div>
        </div>
    )
}