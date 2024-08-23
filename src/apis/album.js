import { authAxios } from '../axios/index.js';

export const getAlbumList = async ({ userId, sortBy }) => {
  const repsponse = await authAxios.get(`/users/${userId}/albums`, {
    params: { ...(sortBy && { sort_by: sortBy }) },
  });
  return repsponse.data.data.albums;
};

export const getAlbumDetail = async ({ albumId }) => {
  const response = await authAxios.get(`/albums/${albumId}`);
  return response.data.data;
};

export const deleteAlbum = async ({ albumId }) => {
  const response = await authAxios.delete(`/albums/${albumId}`);
  return response;
};
