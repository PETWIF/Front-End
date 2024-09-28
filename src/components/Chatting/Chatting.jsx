import { useState, useEffect } from 'react';

import { Avatar } from '../Avatar';
import { Icon } from '../../components/Icon';

import { CHAT_DATA } from '../../dummy/data';
import { Profile as Img } from '../../dummy/images';

import { postReportChat } from '../../apis/report.js';

import * as S from './Chatting.style.jsx';
import { createChatRoom, fetchChatMessages, sendMessageAPI, leaveChatRoomAPI } from '../../apis/chat.js';

export default function Chatting({nickname, onCloseChat}) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatRoomId, setChatRoomId] = useState(null);
  const [page, setPage] = useState(1); // 페이지 번호 초기값

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchChatRoomIdAndMessages = async () => {
      const chatRooms = JSON.parse(localStorage.getItem('chatRooms')) || {};
      const storedChatRoomId = chatRooms[nickname];
  
      if (storedChatRoomId) {
        setChatRoomId(storedChatRoomId);
        try {
          const response = await fetchChatMessages(storedChatRoomId, page); 
          const fetchedMessages = response.data?.chatList || []; 
          console.log('Fetched messages:', response.data);
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('채팅 메세지 조회 실패:', error);
        }
      } else {
        try {
          const response = await createChatRoom({ nickname });
          const { chatRoomId } = response.data;
          setChatRoomId(chatRoomId);
  
          // 로컬 스토리지에 사용자별로 chatRoomId 저장
          chatRooms[nickname] = chatRoomId;
          localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
  
          // 채팅방 생성 후 첫 페이지 메세지 조회
          const messageResponse = await fetchChatMessages(chatRoomId, page);
          const fetchedMessages = messageResponse.data?.chatList || [];
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('채팅방 생성 실패:', error.response);
        }
      }
    };
  
    fetchChatRoomIdAndMessages();
    
  }, [nickname, page]);
  
  


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() && chatRoomId) {
      // 메시지를 서버로 보내기
      try {
        const token = localStorage.getItem('accessToken'); // 토큰 가져오기
        await sendMessageAPI({ chatRoomId, content: inputValue, chatImages: null, token });
        console.log('메시지 전송 성공:', inputValue);
        
        // 메시지 전송 후 서버에서 다시 메시지 목록 조회
        const response = await fetchChatMessages(chatRoomId, page);
        const fetchedMessages = response.data?.chatList || [];  // 서버에서 받은 chatList 사용
        setMessages(fetchedMessages);  // 새로운 메시지만으로 업데이트
  
        setInputValue('');  // 메시지 전송 후 입력 필드 초기화
      } catch (error) {
        console.error('메시지 전송 실패:', error);
      }
    }
  };
  

  
  
  const handleLeaveChatRoom = async () => {
    if (chatRoomId) {
      try {
        const token = localStorage.getItem('accessToken'); 
        await leaveChatRoomAPI({ chatRoomId, token });
  
        // 로컬 스토리지에서 사용자별로 chatRoomId 삭제
        const chatRooms = JSON.parse(localStorage.getItem('chatRooms')) || {};
        delete chatRooms[nickname];
        localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
  
        console.log('채팅방 나가기 성공');

        if (typeof onCloseChat === 'function') {
          onCloseChat();
        } else {
          console.error('onCloseChat이 함수가 아닙니다.', onCloseChat);
        }
      } catch (error) {
        console.error('채팅방 나가기 실패:', error);
      }
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
        <S.ChatLeaveButton onClick={handleLeaveChatRoom}>
          <Icon id='exitdoor' width='40' height='40'/>
        </S.ChatLeaveButton>
        <S.ChatTitle>채팅하기</S.ChatTitle>
        <S.NotificationButton>
          <Icon id='notification' width='24' height='24' />
        </S.NotificationButton>
      </S.ChatHeader>
      <S.ChatMessages>
        {messages.map((message) => (
          <S.ChatMessage key={message.chatId} isMe={message.memberId === Number(userId)}>
            {message.memberId !== Number(userId) && (
              <S.ChatName>
                <Avatar src={Img} size='24px' />
                {nickname}
              </S.ChatName>
            )}
            <S.ChatBubbleContainer isMe={message.memberId === Number(userId)}>
              <S.ChatBubble isMe={message.memberId === Number(userId)}>
                {message.content}
              </S.ChatBubble>
              <S.ChatTimestamp isMe={message.memberId === Number(userId)}>
                {message.timestamp}
              </S.ChatTimestamp>
              {message.memberId !== Number(userId) ? 
              <S.ReportButton 
              isMe={message.memberId === Number(userId)}
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
