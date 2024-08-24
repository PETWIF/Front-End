import { authAxios } from '../axios/index.js';

export const writeComment = async ({ albumId, content }) => {
  const response = await authAxios.post(`/albums/${albumId}/comments`, {
    content,
  });
  return response.data;
};

export const likeComment = async ({ commentId }) => {
  const response = await authAxios.post(`/comments/${commentId}/like`);
  return response.data;
};

export const writeReply = async ({ commentId, content }) => {
    const response = await authAxios.post(`/comments/${commentId}/replies`, {
      content,
    });
    return response.data;
};

export const likeReply = async ({ replyId, commentId }) => {
    const response = await authAxios.post(`/comments/${commentId}/replies/${replyId}/like`);
    return response.data;
};

