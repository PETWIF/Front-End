import { authAxios } from "../axios";

export const createChatRoom = async ({ nickname }) => {
    try {
      const response = await authAxios.post('/chats/chatRoom', { nickname });
      return response.data;
    } catch (error) {
      console.error('채팅방 생성 실패:', error);
      throw error;
    }
  };


// 채팅 메시지 조회 API
export const fetchChatMessages = async (chatRoomId, page) => {
    try {
      const response = await authAxios.get(`/chats/chatRoom/${chatRoomId}`, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('채팅 메시지 조회 실패:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const sendMessageAPI = async ({ chatRoomId, content, chatImages, token }) => {
    const formData = new FormData();
    formData.append('content', content);
    
    if (chatImages) {
      formData.append('chatImages', chatImages);  // 파일을 추가할 수 있습니다.
    }
  
    try {
      const response = await authAxios.post(
        `/chats/chatRoom/${chatRoomId}/send?content=${encodeURIComponent(content)}`, // content를 쿼리 파라미터로 추가
        formData, 
        {
          headers: {
            'X-Auth-Token': token,  // Authorization 대신 X-Auth-Token 헤더 추가
            'Content-Type': 'multipart/form-data', // 폼 데이터 전송
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('메시지 전송 실패:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  

  // 채팅방 나가기 API
export const leaveChatRoomAPI = async ({ chatRoomId, token }) => {
    try {
      const response = await authAxios.delete(
        `/chats/chatRoom/${chatRoomId}`,
        {
          headers: {
            'X-Auth-Token': token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('채팅방 나가기 실패:', error.response ? error.response.data : error.message);
      throw error;
    }
  };