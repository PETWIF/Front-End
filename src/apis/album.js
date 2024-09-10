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

export const createAlbum = async ({ title, content, scope, coverImage, albumImages }) => {
  const formData = new FormData();
  
  formData.append('title', title);
  formData.append('content', content);
  formData.append('scope', scope);
  formData.append('coverImage', coverImage);

  // 앨범 이미지 배열을 순회하면서 각각을 FormData에 추가
  albumImages.forEach((image, index) => {
    formData.append(`albumImages[${index}]`, image);
  });

  const response = await authAxios.post('/albums', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const likeAlbum = async ({ albumId }) => {
  const response = await authAxios.post(`/albums/${albumId}/like`);
  return response;
};

export const deleteAlbumLike = async ({ albumId }) => {
  const response = await authAxios.delete(`/albums/${albumId}/like`);
  return response;
};