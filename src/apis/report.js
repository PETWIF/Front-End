import { authAxios } from '../axios/index.js';

export const postReportComment = async ({ commentId, content }) => {
    const response = await authAxios.post(`/comment/${commentId}/report`, {
        content: content,
    },
    {
      params: { commentId },
    });   
    
    return response.data;
};

export const postReportChat = async ({ chatRoomId, chatId, content }) => {
  const response = await authAxios.post(`/chats/chatRoom/${chatRoomId}/report`, {
      content: content,
  },
  {
    params: { chatRoomId, chatId, },
  });   
  
  return response.data;
};

export const postReportAlbum = async ({ albumId, reportReason }) => {
  const response = await authAxios.post(`/albums/${albumId}/report`, {
      reportReason: reportReason,
  },
  {
    params: { albumId },
  });   
  
  return response.data;
};