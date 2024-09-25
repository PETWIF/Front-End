import { useState } from 'react';

import { Avatar } from '../Avatar';
import { Icon } from '../../components/Icon';

import { CHAT_DATA } from '../../dummy/data';
import { Profile as Img } from '../../dummy/images';

import { postReportChat } from '../../apis/report.js';

import * as S from './Chatting.style.jsx';

const nickname = '댕댕산책가';

export default function Chatting() {
  const [messages, setMessages] = useState(CHAT_DATA);
  const [inputValue, setInputValue] = useState('');


  /*
  const [otherId, setOtherId] = useState(null); // otherId 상태
  const [chatRoomId, setChatRoomId] = useState(null); // chatRoomId 상태

  // 서버에서 otherId를 받아오는 함수
  const fetchOtherId = async () => {
    try {
      const response = await authAxios.get('/chat/getOtherId');  // 서버에서 otherId 요청
      setOtherId(response.data.otherId);  // 받아온 otherId 저장
    } catch (error) {
      console.error('Error fetching otherId:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 서버에서 otherId를 받아옴
  useEffect(() => {
    fetchOtherId();
  }, []);

  // otherId로 채팅방 생성 요청
  const createChatRoom = async () => {
    if (otherId) {
      try {
        const response = await authAxios.post('/chats/chatRoom', {
          otherId,  // 상대방의 userId를 서버에 전송
        });
        if (response.data.isSuccess) {
          setChatRoomId(response.data.data.chatRoomId);  // chatRoomId 저장
        } else {
          console.log('채팅방 생성 실패:', response.data.message);
        }
      } catch (error) {
        console.error('채팅방 생성 중 오류 발생:', error);
      }
    }
  };

  // 컴포넌트가 렌더링된 후 채팅방 생성 요청
  useEffect(() => {
    if (otherId) {
      createChatRoom();
    }
  }, [otherId]);

  // 메시지 전송 함수 (chatRoomId와 함께 서버에 전송)
  const handleSendMessage = async () => {
    if (inputValue.trim() && chatRoomId) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        text: inputValue,
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // 서버에 메시지 전송
      await sendMessageToServer(chatRoomId, newMessage.text); // chatRoomId와 메시지 전송

      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  // 서버로 메시지 전송 함수 (chatRoomId와 함께 전송)
  const sendMessageToServer = async (chatRoomId, messageText) => {
    try {
      const response = await authAxios.post(`/chats/chatRoom/${chatRoomId}/send`, {
        content: messageText,  // 메시지 내용
        chatImages: null,      // 이미지를 보낼 경우 chatImages도 추가 가능
      });

      if (response.data.isSuccess) {
        console.log('메시지가 성공적으로 전송되었습니다.');
      } else {
        console.log('메시지 전송 실패:', response.data.message);
      }
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error);
    }
  };
  */

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        text: inputValue,
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      console.log('새 채팅:', inputValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 엔터 입력 시 기본 동작 방지 (폼 제출 등)
      handleSendMessage();
    }
  };

  

  // const handleReportChatting = async (chatId, content) => {
  //   // 더미 데이터라 chatRoomId 없음 -> api 연결 후 가져와서 주석 풀기
  //   const response = await postReportChat({ chatRoomId, chatId, content });
  //   const { isSuccess, data } = response;

  //   if (isSuccess) {
  //     console.log(`${chatId}번 채팅 신고 완료:`, data);
  //   } else {
  //     console.log('에러 발생');
  //   }
  // };

  return (
    <S.ChatContainer>
      <S.ChatHeader>
        <S.ChatTitle>채팅하기</S.ChatTitle>
        <S.NotificationButton>
          <Icon id='notification' width='24' height='24' />
        </S.NotificationButton>
      </S.ChatHeader>
      <S.ChatMessages>
        {messages.map((message) => (
          <S.ChatMessage key={message.id} isMe={message.sender === 'me'}>
            {message.sender === 'friend' && (
              <S.ChatName>
                <Avatar src={Img} size='24px' />
                {nickname}
              </S.ChatName>
            )}
            <S.ChatBubbleContainer isMe={message.sender === 'me'}>
              <S.ChatBubble isMe={message.sender === 'me'}>
                {message.text}
              </S.ChatBubble>
              <S.ChatTimestamp isMe={message.sender === 'me'}>
                {message.timestamp}
              </S.ChatTimestamp>
              {message.sender !== 'me' ? 
              <S.ReportButton 
              isMe={message.sender === 'me'}
              // onClick={() => {handleReportChatting(message.id, message.text)}}
              >
                신고
              </S.ReportButton > : "" }
            </S.ChatBubbleContainer>
          </S.ChatMessage>
        ))}
      </S.ChatMessages>
      <S.ChatInputContainer>
        <S.PlusButton>
          <Icon id='plusbutton' width='25' height='25' />
        </S.PlusButton>
        <S.ChatInput
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Enter 키 입력을 처리
          placeholder='상대에게 메시지 보내기'
        />
        <S.ChatSendButton onClick={handleSendMessage}>
          <Icon id='sendbutton' width='26' height='27' />
        </S.ChatSendButton>
      </S.ChatInputContainer>
    </S.ChatContainer>
  );
}
