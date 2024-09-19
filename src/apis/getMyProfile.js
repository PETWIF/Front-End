import { authAxios } from '../axios/index.js';

export const getMyProfile = async () => {
    const response = await authAxios.get(`/member/me/withAuth`, {
    });   
    
    return response.data;
};

export const getMyProfileWithoutAuth = async ({ email }) => {
    const response = await authAxios.get(`/member/me/withoutAuth`, {
        params: { email: email },
    });   
    
    return response.data;
};