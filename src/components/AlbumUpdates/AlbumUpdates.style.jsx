import styled from 'styled-components';

export const AlbumUpdatesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const AlbumUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${(props) => props.theme.color.primary};
`;

export const UserName = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.color.black};
`;
