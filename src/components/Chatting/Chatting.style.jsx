import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 720px;
  background-color: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  position: relative;
`;


export const ChatTitle = styled.h2`
  margin-top: 15px;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-weight: 500;
  line-height: 28.96px;
  color: #000000;
`;

export const NotificationButton = styled.button`
  position: absolute;
  top: 45%;
  right: 30px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover svg {
    fill: ${(props) => props.theme.color.primary};
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: calc(100% - 60px);

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ChatName = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.color.gray};
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.27px;
  text-align: left;
`;

export const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMe ? 'flex-end' : 'flex-start')};
  font-family: Noto Sans KR;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.27px;
  text-align: left;
  margin-bottom: 10px; /* 메시지와 타임스탬프 사이의 기본 간격 */
`;

export const ChatBubbleContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMe ? 'row-reverse' : 'row')};
  align-items: flex-end; /* 메시지와 타임스탬프가 같은 선상에 위치하게 */
  gap: 5px; /* 타임스탬프와 메시지 버블 사이의 간격 */
`;

export const ChatBubble = styled.div`
  max-width: 60%;
  padding: 10px;
  background-color: ${(props) => (props.isMe ? props.theme.color.primary : '#FFF0BA')};
  color: ${(props) => (props.isMe ? 'white' : 'black')};
  border-radius: 10px;
  word-break: break-word;
  margin-bottom: 0; /* 타임스탬프와의 간격을 없앰 */
`;

export const ChatTimestamp = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.color.gray};
  align-self: center; /* 타임스탬프가 항상 메시지 버블의 중심에 위치하도록 설정 */
  margin-top: 5px; /* 타임스탬프와 메시지 버블 사이의 간격 */
  margin-left: 3px; /* 타임스탬프와 메시지 버블 사이의 간격 */
  margin-right: 3px; /* 타임스탬프와 메시지 버블 사이의 간격 */
  position: relative; /* 부모 요소에 상대적인 위치를 지정 */
  bottom: -22px; /* 타임스탬프를 버블의 하단에 위치시키기 위해 하향 조정 */
`;

export const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #FFFFFF;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const PlusButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;

  svg {
    width: 24px;
    height: 24px;
    fill: #555; /* "+" 아이콘 색상 */
  }
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 9px;
  outline: none;
  background-color: #e8e8e8;
  font-size: 14px;
  color: #555;
`;

export const ChatSendButton = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  padding: 0; /* 추가적인 여백 제거 */
  box-sizing: border-box; /* 내부 요소의 크기 포함 방식 제어 */

  svg {
    width: 24px;
    height: 24px;
    fill: white;
    display: block; /* 블록 레벨 요소로 설정 */
    margin: auto; /* 중앙 배치 */
  }

  &:hover {
    background-color: ${(props) => props.theme.color.primaryDark};
  }
`;
