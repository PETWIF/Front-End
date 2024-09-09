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

export const patchNicknameBeforeLogin = async ({ email, nickname }) => {
  const response = await authAxios.patch(`/member/nickname/beforeLogin`, {
      nickname: nickname,
  },
  {
    params: { email },
  });   
  
  return response.data;
};

export const postProfilePicBeforeLogin = async ({ email, formData }) => {
  const response = await authAxios.post('/member/profile/beforeLogin', 
      { 
      headers: {
        'Content-Type': 'multipart/form-data', // multipart/form-data로 설정
      }},
      {
        params: { email },
    }
);

return response.data;
};