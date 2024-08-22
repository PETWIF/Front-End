import { authAxios } from '../axios/index.js';

export const getAblumList = async ({ userId, sortBy }) => {
  const repsponse = await authAxios.get(`/users/${userId}/albums`, {
    params: { ...(sortBy && { sort_by: sortBy }) },
  });
  return repsponse.data.data.albums;
};
