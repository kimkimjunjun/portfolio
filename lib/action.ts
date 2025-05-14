// 'use server' 대신 API Route는 기본적으로 서버에서 실행됩니다.
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_KEY,
    },
});

// POST 요청을 처리하는 핸들러 함수를 export 합니다.
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string; // API Route에서는 이메일 필드도 받을 수 있도록 수정
        const subject = formData.get('subject') as string;

        // 필수 필드 검증
        if (!name || !email || !subject) {
            return NextResponse.json({ message: '필수 필드를 모두 입력해주세요.' }, { status: 400 });
        }

        await transporter.sendMail({
            from: process.env.GMAIL_USER, // 보내는 이메일
            to: 'wnsgnl323@naver.com', // 받는 이메일 (고정)
            replyTo: email, // 문의자의 이메일로 답장 가능하도록 설정
            subject: `[문의] ${name}님 문의 내용: ${subject.substring(0, 50)}...`, // 제목 양식 변경 및 내용 일부 포함
            html: `<p><strong>보낸 사람:</strong> ${name}</p>
                   <p><strong>보낸 사람 이메일:</strong> ${email}</p>
                   <p><strong>문의 내용:</strong></p>
                   <p>${subject}</p>`, // HTML 본문 양식 개선
        });

        console.log(`이메일 전송 성공: ${name}, ${email}`);
        return NextResponse.json({ message: '이메일 전송 성공' }, { status: 200 });

    } catch (error) {
        console.error('이메일 전송 오류:', error);
        // 오류 발생 시 클라이언트에 오류 응답 반환
        return NextResponse.json({ message: '이메일 전송 실패' }, { status: 500 });
    }
}
