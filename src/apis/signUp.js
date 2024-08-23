import { authAxios } from '../axios/index.js';

export const postSignUp = async ({ name, email, pwd, pwdRe }) => {
    const response = await authAxios.post(`/member/register`, {
        name: name,
        email: email,
        pw: pwd,
        pw_check: pwdRe,
    });   
    
    return response.data;
};
