import { authAxios } from '../axios';

export const block = async ({ nickname }) => {
  const response = await authAxios.post('/blocks', {
    nickname,
  });

  return response;
};

export const viewBlockList = async ({ page = 0 }) => {
  const response = await authAxios.get('/blocks', {
    params: { page },
  });
  return response.data.data.blockList;
};

export const unblock = async ({ nickname }) => {
  const response = await authAxios.delete('/blocks', {
    params: { nickname },
  });
  return response;
};

export const checkBlock = async ({ nickname }) => {
  const response = await authAxios.get('/blocks/status', {
    params: { nickname },
  });
  return response;
};


