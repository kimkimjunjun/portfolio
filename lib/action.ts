'use server'; // 이 파일이 서버에서 실행됨을 명시

const nodemailer = require('nodemailer');
interface EmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // 유효성 검사 (간단 예시)
    if (!name || !email || !subject || !message) {
        return { success: false, message: '모든 필드를 입력해주세요.' };
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Gmail 서비스 사용
        auth: {
            user: process.env.GMAIL_USER, // .env.local에 설정한 Gmail 주소
            pass: process.env.GMAIL_PASS, // .env.local에 설정한 앱 비밀번호
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER, // 보내는 사람 (자신의 Gmail)
        to: process.env.GMAIL_USER, // 받는 사람 (자신의 Gmail) - 필요에 따라 변경
        subject: `문의: ${subject} from ${name}`,
        text: `보낸 사람: ${name}\n이메일: ${email}\n\n내용:\n${message}`,
        html: `
      <p><strong>보낸 사람:</strong> ${name}</p>
      <p><strong>이메일:</strong> ${email}</p>
      <p><strong>제목:</strong> ${subject}</p>
      <br>
      <p><strong>내용:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('이메일 전송 성공');
        return { success: true, message: '이메일이 성공적으로 전송되었습니다.' };
    } catch (error) {
        console.error('이메일 전송 실패:', error);
        // 오류 객체 전체를 클라이언트로 보내지 않도록 처리
        return { success: false, message: '이메일 전송에 실패했습니다. 나중에 다시 시도해주세요.' };
    }
}
