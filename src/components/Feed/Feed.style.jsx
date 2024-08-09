import styled from 'styled-components';

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FeedItem = styled.div`
  height: 800px;
  background: ${(props) => props.theme.color.white};
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: flex-inline;
  gap: 20px;
`;

// 헤더 영역, 북마크나 좋아요 등의 아이콘 영역, 앨범 사진 영역을 한 번에 묶습니다
export const FeedZone = styled.div`
  width: 70%;
  height: auto;
  background: ${(props) => props.theme.color.white};
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: flex-inline;
  justify-content: space-between;
  align-items: center;
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
  margin-left: auto;

  svg {
    cursor: pointer;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: flex-start;
  gap: 10px;
  width: 30%;
  height: 90%;
`;

export const AlbumImage = styled.img`
  width: 100%;
  border-radius: 10px;
  height: auto;
  max-height: 100%;
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

export const AlbumComment = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

export const CommentSectionContainer = styled.div`
  align-items: center;
  justify-contents: flex-start;
  height: 100%; /* 본문 제외 영역 전체를 댓글 섹션으로 설정 */
  padding-right: 10px; /* 스크롤 바 공간 확보 */
`;

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 100%;
  overflow-y: auto;
  height: 65%; 

  ::-webkit-scrollbar {
        display: none;
  }

  scrollbar-width: none;
  scrollbar-color: transparent transparent;

  -ms-overflow-style: none; 
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  height: 60px;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid ${(props) => props.theme.color.gray};
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

// 구분선 스타일링
export const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray3};
  border: none;
`;
