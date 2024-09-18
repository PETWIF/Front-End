import { authAxios } from '../axios/index.js';

export const patchNickname = async ({ nickname }) => {
    const response = await authAxios.patch(`/member/nickname`, {
        nickname: nickname,
    });   
    
    return response.data;
};

export const postProfilePic = async ({ id, file }) => {
  const response = await authAxios.post(
    '/member/profile',
    { file: file, }, 
    {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
      params: { id },
    },
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
