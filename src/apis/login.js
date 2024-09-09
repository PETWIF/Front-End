import { authAxios } from '../axios/index.js';

export const postLogin = async ({ email, password }) => {
    const response = await authAxios.post(`/member/email/login`, {
        email: email,
        pw: password,
    });   
    
    return response.data;
};

export const postKakaoLogin = async ({ kakaoCode }) => {
    const response = await authAxios.get(`/login/oauth2/oauth?code=${code}`, {
    }, 
    {
        params: { code: kakaoCode, }
    }
);   
    return response.data;
};

export const postGoogleLogin = async ({ googleCode }) => {
    const response = await authAxios.post(`/login/oauth2/code/google?code=${googleCode}`, {
    }, 
    {
        params: { code: googleCode, }
    }
);   
    
    return response.data;
};
