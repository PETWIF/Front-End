import styled from 'styled-components';

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%; // max-height이 설정되어 있어서 댓글창 잘리는 문제 발생
  overflow-y: auto;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: ${(props) => props.theme.color.lightGray};
  border-radius: 10px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

export const ReportButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.color.gray};
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: ${(props) => props.theme.color.primary};
  }
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

export const ReplySection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const ReplyInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.color.gray};
`;

export const ReplyButton = styled.button`
  padding: 5px 15px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.primaryDark};
  }
`;

export const Replies = styled.div`
  margin-top: 10px;
`;

export const Reply = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: ${(props) => props.theme.color.lighterGray};
  border-radius: 10px;
  margin-top: 5px;
`;

export const ReplyAuthor = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

export const ReplyText = styled.div`
  margin-left: 10px;
`;

export const ReplyActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.color.gray};
`;
