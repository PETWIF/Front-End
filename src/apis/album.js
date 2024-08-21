import { authAxios } from '../axios/index.js';

export const getAblumList = async ({ userId }) => {
  const repsponse = await authAxios.get(`/users/${userId}/albums`);
  return repsponse.data.data.albums;
};
