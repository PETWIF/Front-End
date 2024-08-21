import { authAxios } from '../axios/index.js';

export const postLogin = async ({ email, password }) => {
    const response = await authAxios.post(`/member/email/login`, {
        email: email,
        pw: password,
    });   
    return response.data;
};
