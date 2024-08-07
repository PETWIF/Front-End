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
`;

export const AlbumImage = styled.img`
  width: 60%;
  border-radius: 10px;
`;

export const AlbumDetails = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
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
`;

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: ${(props) => props.theme.color.lightGray};
  border-radius: 10px;
  margin-top: 10px;
`;

export const CommentAuthor = styled.div`
  font-weight: bold;
`;

export const CommentText = styled.div`
  margin-left: 10px;
`;

export const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.color.gray};
`;

export const CommentCreatedAt = styled.div``;

export const CommentInputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CommentInputSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid ${(props) => props.theme.color.gray};
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
