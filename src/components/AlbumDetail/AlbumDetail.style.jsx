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
  background-color: #818181;
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

export const CommentInputWrapper = styled.div`
  display: flex;
  height: 60px; 
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid ${(props) => props.theme.color.gray};
  position: relative; /* 위치를 부모 요소 내에 고정 */
`;

export const CommentInputSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const UserProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 50%;
`;

export const CommentInput = styled.input`
  width: 70%;
  padding: 10px;
  border-radius: 20px;
  margin: 5px;
  border: 1px solid ${(props) => props.theme.color.gray};
`;

export const CommentButton = styled.button`
  padding: 10px 20px;
  width: 80px;
  margin: 5px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.primaryDark};
  }
`;