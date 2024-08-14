
import React from 'react';
import CommentSection from './CommentSection';
import { Link } from 'react-router-dom';

import { Button } from '../Button/index.js';
import { Layout } from '../Common/index.js';
import { Avatar } from '../Avatar/index.js';
import { Icon } from '../../components/Icon';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import { RANDOM_FRIENDS } from '../../dummy/data/index.js';

import * as S from './AlbumDetail.style.jsx';

const nickname = '펫위프';

export default function AlbumDetail({ album }) {
  const { profileImage, profileName, albumImage, likeCount, createdAt, comments, comment, likeUsers = [] } = album;
  const [newComment, setNewComment] = React.useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('새 댓글:', newComment);
    setNewComment('');
  };

  const handleReport = (commentId) => {
    console.log(`댓글 ${commentId}가 신고되었습니다.`);
    // 여기에 신고 처리 로직을 추가
  };

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
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
            comments={comments.map((comment) => ({
              ...comment,
              createdAt: formatDate(comment.createdAt),
              replies: comment.replies
                ? comment.replies.map((reply) => ({
                    ...reply,
                    createdAt: formatDate(reply.createdAt),
                  }))
                : [],
            }))}
            onReport={handleReport} // 신고 기능 처리 함수 전달
          /> 
          </S.CommentSection>

          <S.CommentInputWrapper>
            <S.CommentInputSection>
              <S.UserProfileImage src={profileImage} alt="현재 로그인된 사용자 프로필" />
              <S.CommentInput
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="댓글을 입력하세요..."
              />
              <S.CommentButton onClick={handleCommentSubmit}>등록</S.CommentButton>
            </S.CommentInputSection>
          </S.CommentInputWrapper>

        </S.CommentSectionContainer>
      
    </S.AlbumDetailLayout>
  );
}
