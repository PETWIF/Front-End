import { authAxios } from '../axios/index.js';

export const postLogin = async ({ email, password }) => {
    const response = await authAxios.post(`/member/email/login`, {
        email: email,
        pw: password,
    });   
    
    return response.data;
};

    export const getKakaoLogin = async ({ code }) => {
    console.log(code);
    console.log("토큰 확인:", localStorage.getItem('accessToken'));
    const response = await authAxios.get(`/login/oauth2/oauth`,
      {
        params: {  code: encodeURIComponent(code) },
      }
    );

    return response.data;
  };
  

  export const postGoogleLogin = async ({ code }) => {
    console.log(code);
    const response = await authAxios.post(`/login/oauth2/code/google`, 
      {}, 
      {
        params: { code: encodeURIComponent(code) }, 
      }
    );
  
    return response.data;
  };
  