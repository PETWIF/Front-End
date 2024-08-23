import { authAxios } from '../axios/index.js';

export const postLogin = async ({ email, password }) => {
    const response = await authAxios.post(`/member/email/login`, {
        email: email,
        pw: password,
    });   
    
    return response.data;
};

export const postGoogleLogin = async ({ googleCode }) => {
    const response = await authAxios.post(`/login/oauth2/code/google?code=${googleCode}`, {
        code: googleCode,
    });   
    
    return response.data;
};
