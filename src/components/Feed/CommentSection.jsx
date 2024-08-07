import React from 'react';
import * as S from './CommentSection.style';
import { FaHeart } from 'react-icons/fa';

const CommentSection = ({ comments }) => {
  return (
    <S.CommentSection>
      {comments.map((comment) => (
        <S.Comment key={comment.id}>
          <S.CommentAuthor>
            <S.ProfileImage src={comment.authorProfileImage} alt={`${comment.author} 프로필`} />
            {comment.author}
          </S.CommentAuthor>
          <S.CommentText>{comment.text}</S.CommentText>
          <S.CommentActions>
            <FaHeart /> {comment.likeCount}
            <S.CommentCreatedAt>{comment.createdAt}</S.CommentCreatedAt>
          </S.CommentActions>
        </S.Comment>
      ))}
    </S.CommentSection>
  );
};

export default CommentSection;
