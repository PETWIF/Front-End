import { authAxios } from '../axios/index.js';

export const likeComment = async ({ commentId }) => {
  const response = await authAxios.post(`/comment/${commentId}/like`);
  return response;
};

export const deleteCommentLike = async ({ commentId }) => {
  const response = await authAxios.delete(`/comment/${commentId}/like`);
  return response;
};
