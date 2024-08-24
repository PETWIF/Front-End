import { useState } from 'react';

import { Avatar } from '../Avatar';
import { Icon } from '../../components/Icon';

import { CHAT_DATA } from '../../dummy/data';
import { Profile as Img } from '../../dummy/images';

import * as S from './Chatting.style.jsx';

const nickname = '댕댕산책가';

export default function Chatting() {
  const [messages, setMessages] = useState(CHAT_DATA);
  const [inputValue, setInputValue] = useState('');

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
