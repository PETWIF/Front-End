import { authAxios } from '../axios/index.js';

export const getHomeList = async ({ page = 0 }) => {
  const response = await authAxios.get('/posts', {
    params: { page },
  });
  return response.data.data;
};
  
export const getAlbumList = async ({ nickname, page = 0, sortBy }) => {
  const repsponse = await authAxios.get(`/users/albums`, {
    params: { nickname, page, ...(sortBy && { sort_by: sortBy }) },
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

export const editAlbum = async ({ albumId, title, content, scope }) => {
  const response = await authAxios.patch(`/albums/${albumId}`, {
    requestDto: {
      title,
      content,
      scope,
    },
  });
  return response;
};
