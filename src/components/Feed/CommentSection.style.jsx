import styled from 'styled-components';

export const CommentSection = styled.div`
  margin-top: 10px;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: ${(props) => props.theme.color.lightGray};
  border-radius: 10px;
  margin-top: 10px;
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
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

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
`;
