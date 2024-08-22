import React, { useState, useEffect } from 'react';
import CommentSection from './CommentSection';
import { Icon } from '../Icon';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import * as S from './AlbumDetail.style.jsx';

const AlbumDetail = ({ album }) => {
  const { profileImage, profileName, albumImage, likeCount, createdAt, comments: initialComments, comment, likeUsers = [] } = album;
  const [newComment, setNewComment] = useState('');

  const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
  };
  
  const [comments, setComments] = useState(
    initialComments.map((comment) => ({
      ...comment,
      createdAt: isValidDate(comment.createdAt)
        ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ko })
        : 'Invalid date',
      replies: comment.replies
        ? comment.replies.map((reply) => ({
            ...reply,
            createdAt: isValidDate(reply.createdAt)
              ? formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: ko })
              : 'Invalid date',
          }))
        : [],
    }))
  );

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: Date.now(),
        author: "현재 사용자",
        profileImage: "/path/to/profile.jpg",
        text: newComment,
        likeCount: 0,
        createdAt: '방금',
        replies: [],
      };
  
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  const handleReport = (commentId) => {
    console.log(`댓글 ${commentId}가 신고되었습니다.`);
  };



  const formatDate = (date) => {
    return isValidDate(date) 
      ? formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko }) 
      : 'Invalid date';
  };

  return (
    <S.AlbumDetailLayout>
      <S.IconContainer>
        <Icon id='bookmark' width='26' height='27' />
        <Icon id='message' width='26' height='26' />
        <Icon id='share' width='17' height='28' />
      </S.IconContainer>
      <S.Title>앨범 정보</S.Title>
      <S.AlbumComment>
        {comment}
      </S.AlbumComment>
      <S.CreatedAt>{formatDate(createdAt)}</S.CreatedAt>
      <S.StyledHr />

      <S.CommentSectionContainer>
        <S.CommentSection>
          <CommentSection
            key={comments.length} 
            comments={comments}
            onReport={handleReport}
          /> 
        </S.CommentSection>

        <S.CommentInputContainer>
          <S.PlusButton>
            <Icon id="plusbutton" width="25" height="25" />
          </S.PlusButton>
          <S.UserProfileImage src={profileImage} alt="현재 로그인된 사용자 프로필" />
          <S.CommentInput
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요..."
          />
          <S.CommentSendButton onClick={handleCommentSubmit}>
            <Icon id='sendbutton' width='26' height='27' />
          </S.CommentSendButton>
        </S.CommentInputContainer>

      </S.CommentSectionContainer>
    </S.AlbumDetailLayout>
  );
}

export default AlbumDetail;
