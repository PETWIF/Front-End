import styled from 'styled-components';
import { Layout } from '../Common';

export const AlbumDetailLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 자식 요소가 레이아웃을 넘치지 않도록 설정 */
`;

export const IconContainer = styled.div`
  display: flex;
  padding: 10px 0 0 10px;
  gap: 16px; /* 아이콘들 사이에 10px 간격을 추가 */
`;

export const Title = styled.h2`
  padding: 15px 0 0 10px;
  margin-bottom: 21px;
  color: #000000;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-weight: 600;
  line-height: 28.96px;
  letter-spacing: 0.05em;
  text-align: left;
`;

export const AlbumComment = styled.div`
  padding: 0 10px 0 10px;
  font-size: 16px;
  font-family: Noto Sans KR;
  font-weight: 500;
  line-height: 30px;
  text-align: left;
`;

export const CreatedAt = styled.div`
  padding: 7px 10px 7px 10px;
  color: #848484;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 500;
  line-height: 23.17px;
  text-align: left;
`;

export const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray3};
  border: none;
`;


export const FriendItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: ${(props) => props.theme.color.black};

  & > div {
    display: flex;
    align-items: center;
    gap: 13px;
  }
`;

export const CommentSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;  /* 스크롤 기능을 활성화 */
  padding-right: 10px; 
  padding-top: 10px;
  box-sizing: border-box; /* 패딩과 경계도 크기에 포함 */
  
  /* 스크롤 바 숨김 */
  ::-webkit-scrollbar {
    display: none; /* 웹킷 브라우저에서 스크롤 바 숨김 */
  }
  -ms-overflow-style: none;  /* IE 및 Edge에서 스크롤 바 숨김 */
  scrollbar-width: none;  /* Firefox에서 스크롤 바 숨김 */
`;

export const CommentSection = styled.div`
  flex-grow: 1;
  max-height: 300px; /* 댓글 리스트의 최대 높이를 설정 */
  overflow-y: auto; /* 댓글이 많아지면 스크롤을 생성 */
  margin-bottom: 16px;
`;

export const UserProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 50%;
`;

export const CommentInputContainer = styled.div`
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

export const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 9px;
  outline: none;
  background-color: #e8e8e8;
  font-size: 14px;
  color: #555;
`;

export const CommentSendButton = styled.button`
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