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
  justify-content: space-between;
  align-items: center;
`;

export const AlbumImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* 4:3 비율 유지 */
  position: relative;
  background-color: ${(props) => props.theme.color.lightGray};
  border-radius: 10px;
`;

export const AlbumImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
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

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 30%;
  height: 90%;
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
  justify-content: flex-start;
  height: 100%; 
  padding-right: 10px; 
`;

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 100%;
  overflow-y: auto; /* 스크롤이 필요할 때 스크롤 바를 활성화 */
  height: 65%; 

  ::-webkit-scrollbar {
    display: none; /* 웹킷 브라우저에서 스크롤바 숨김 */
  }

  -ms-overflow-style: none;  /* IE 및 Edge에서 스크롤바 숨김 */
  scrollbar-width: none;  /* Firefox에서 스크롤바 숨김 */
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

export const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray3};
  border: none;
`;
