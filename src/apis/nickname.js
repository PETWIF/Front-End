import { authAxios } from '../axios/index.js';

export const patchNickname = async ({ nickname }) => {
    const response = await authAxios.patch(`/member/nickname`, {
        nickname: nickname,
    });   
    
    return response.data;
};
