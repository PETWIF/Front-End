import { authAxios } from '../axios/index.js';

export const patchNickname = async ({ nickname }) => {
    const response = await authAxios.patch(`/member/nickname`, {
        nickname: nickname,
    });   
    
    return response.data;
};

export const postProfilePic = async ({ formData }) => {
    const response = await authAxios.post('/member/profile', 
        { //
        headers: {
          'Content-Type': 'multipart/form-data', // multipart/form-data로 설정
        }}
);

  return response.data;
};