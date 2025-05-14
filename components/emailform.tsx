// 'use client'; // 이 컴포넌트가 클라이언트 컴포넌트임을 명시

// import React, { useState } from 'react';
// // useFormState는 서버 액션에 사용되므로 더 이상 필요 없습니다.
// // import { useFormState } from 'react-dom';

// const EmailForm = () => {
//     // 폼 상태 관리를 위한 state 추가 (선택 사항, 필요에 따라 사용할 수 있습니다)
//     const [formData, setFormData] = useState({ name: '', email: '', subject: '' });
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState(''); // 전송 결과 메시지 표시

//     // 폼 제출 핸들러
//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault(); // 기본 폼 제출 방지
//         setLoading(true);
//         setMessage('');

//         const formData = new FormData(event.currentTarget);

//         try {
//             // API Route 호출
//             const response = await fetch('/api/send-email', {
//                 method: 'POST',
//                 body: formData, // FormData 객체를 직접 body로 전달
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setMessage(data.message || '성공적으로 전송되었습니다.');
//                 // 폼 필드 초기화 (선택 사항)
//                 // event.currentTarget.reset();
//             } else {
//                 setMessage(data.message || '전송에 실패했습니다.');
//             }
//         } catch (error) {
//             console.error('API 호출 오류:', error);
//             setMessage('전송 중 오류가 발생했습니다.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         // onSubmit 핸들러로 변경
//         <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-4">
//                 <div>
//                     <label htmlFor="name">이름: </label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         placeholder="이름"
//                         required // 필수 필드 표시
//                         value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} // state로 관리 시
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="email">이메일: </label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="이메일"
//                         required // 필수 필드 표시
//                         value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} // state로 관리 시
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="subject">문의 내용: </label>
//                     <textarea
//                         placeholder="문의 내용"
//                         id="subject"
//                         name="subject"
//                         required // 필수 필드 표시
//                         value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} // state로 관리 시
//                     />
//                 </div>
//             </div>
//             {/* loading 상태에 따라 버튼 비활성화 */}
//             <button type="submit" disabled={loading}>
//                 {loading ? '전송 중...' : '전송'}
//             </button>
//             {/* 전송 결과 메시지 표시 */}
//             {message && <p>{message}</p>}
//         </form>
//     );
// };

// export default EmailForm;
