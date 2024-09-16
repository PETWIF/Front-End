import { authAxios } from '../axios/index.js';

export const getMyProfile = async () => {
    const response = await authAxios.get(`/member/me`, {
    });   
    
    return response.data;
};