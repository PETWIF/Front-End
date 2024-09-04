import { authAxios } from '../axios/index.js';

export const patchNickname = async ({ nickname }) => {
    const response = await authAxios.patch(`/member/nickname`, {
        nickname: nickname,
    });   
    
    return response.data;
};

export const postProfilePic = async ({ file }) => {
  const response = await authAxios.post(
    '/member/profile',
    { file: file, },  // formData를 요청 바디로 직접 전달
    {
      headers: {
        'Content-Type': 'multipart/form-data',  // 헤더는 세 번째 인수로 전달
      }
    }
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

export const postProfilePicBeforeLogin = async ({ email, file }) => {
  const response = await authAxios.post('/member/profile/beforeLogin', 
    { file: file },  
    {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
      params: { email }  
    }
  );
  
  return response.data;
};

