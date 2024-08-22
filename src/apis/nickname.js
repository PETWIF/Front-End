import { authAxios } from '../axios/index.js';

export const patchNickname = async ({ nickname }) => {
    const response = await authAxios.patch(`/member/nickname`, {
        nickname: nickname,
    });   
    
    return response.data;
};

export const postProfilePic = async ({ profilePic }) => {
    const response = await authAxios.post(`/member/profile`, {
        file: profilePic,
    });   
    
    return response.data;
};