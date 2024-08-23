import { authAxios } from '../axios/index.js';

// 입력받은 이메일에 인증번호를 보내도록 하는 코드
// 미가입 상태의 이메일은 어떻게 확인해야 하는지?
export const postEmail = async ({ email }) => {
    const response = await authAxios.post(`/signup/email`, {
        email: email,
    });   
    
    return response.data;
};

// 입력받은 인증번호가 일치하는지 확인하는 코드
export const postCode = async ({ email, code }) => {
    const response = await authAxios.post(`/verify?email=${email}&code=${code}`, {
        email: email,
        code: code,
    });   
    
    return response.data;
};