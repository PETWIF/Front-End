import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch; /* 자식 요소들이 동일한 높이를 가지도록 설정 */
`;

export const FeedItem = styled.div`
  background: ${(props) => props.theme.color.white};
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row; /* FeedZone과 MainContent를 나란히 배치 */
  gap: 20px;
  height: auto; /* 높이가 자동으로 조정되도록 설정 */
  align-items: stretch; /* 자식 요소들이 동일한 높이를 가지도록 설정 */
`;

export const FeedZone = styled.div`
  width: 70%;
  background: ${(props) => props.theme.color.white};
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: auto; /* 높이가 자동으로 조정되도록 설정 */
  flex-grow: 1; /* 공간을 채울 수 있도록 설정 */
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
  height: auto; /* 높이가 자동으로 조정되도록 설정 */
  flex-grow: 1; /* 공간을 채울 수 있도록 설정 */
  height: 1000px; /* StyledLink와 동일한 높이로 설정 */
  max-height: none; /* max-height를 없애서 height로 고정 */
`;

export const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const StyledLink = styled(Link)`
  display: block;
  width: auto;
  height: 900px; /* max-height 대신 height로 고정 */
  border-radius: 10px;
  display: block;
`;

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
  
  /* 스크롤 바 숨김 */
  ::-webkit-scrollbar {
    display: none; /* 웹킷 브라우저에서 스크롤 바 숨김 */
  }

  -ms-overflow-style: none;  /* IE 및 Edge에서 스크롤 바 숨김 */
  scrollbar-width: none;  /* Firefox에서 스크롤 바 숨김 */
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const ProfileName = styled.div`
  font-weight: bold;
`;

export const CreatedAt = styled.div`
  color: ${(props) => props.theme.color.gray};
  font-size: 12px;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    cursor: pointer;
  }
`;

export const Spacer = styled.div`
  width: 100%;
  height: 10%;
  flex: 0 0 auto;
`;

export const AlbumDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
  height: 20%;
`;

export const Likes = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
export const AlbumLikes = styled.div`
  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 500;
  line-height: 23.17px;
  text-align: left;
  display: flex;
  lignItems: center;
`;

export const AlbumComment = styled.div`
  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  text-align: left;
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

export const UserProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 50%;
`;

export const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray3};
  border: none;
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