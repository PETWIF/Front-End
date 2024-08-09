import styled from 'styled-components';

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FeedItem = styled.div`
  background: ${(props) => props.theme.color.white};
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 60%;

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
  gap: 20px;
  height: 100%;
`;

export const AlbumImage = styled.img`
  width: 60%;
  border-radius: 10px;
  height: auto;
  max-height: 100%;
`;

export const AlbumDetails = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
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
  flex: 1;
  overflow-y: auto;
  height: calc(100% - 60px);  /* 댓글 입력란을 제외한 영역 전체를 댓글 섹션으로 설정 */
  padding-right: 10px; /* 스크롤 바 공간 확보 */
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: 100%; /* 댓글 섹션이 전체 영역을 채우도록 설정 */
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid ${(props) => props.theme.color.gray};
`;

export const CommentInputSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const UserProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.color.gray};
`;

export const CommentButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.primaryDark};
  }
`;
