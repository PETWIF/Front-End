import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';
import { Icon } from '../Icon';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Chatting } from '../Chatting';

import * as S from './AlbumDetail.style.jsx';

import { writeComment, likeComment, likeReply } from '../../apis/comment.js'; // API 함수들 import

const AlbumDetail = ({ album, albumId }) => {
  const {
    profileImage,
    profileName,
    albumImage,
    likeCount,
    createdAt,
    comments: initialComments,
    comment,
    likeUsers = [],
  } = album;

  const [newComment, setNewComment] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [comments, setComments] = useState(
    initialComments.map((comment) => ({
      ...comment,
      createdAt: formatDistanceToNow(new Date(comment.createdAt), {
        addSuffix: true,
        locale: ko,
      }),
      replies: comment.replies
        ? comment.replies.map((reply) => ({
            ...reply,
            createdAt: formatDistanceToNow(new Date(reply.createdAt), {
              addSuffix: true,
              locale: ko,
            }),
          }))
        : [],
    }))
  );

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const newCommentData = await writeComment({
          albumId,
          content: newComment,
        });

        setComments([...comments, {
          ...newCommentData,
          createdAt: '방금',
          replies: [],
        }]);
        setNewComment('');
      } catch (error) {
        console.error('댓글 작성 실패:', error);
      }
    }
  };

  const handleCommentHeart = async (commentId) => {
    try {
      await likeComment({ commentId });

      setComments(comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likeCount: comment.likeCount + 1 }
          : comment
      ));
    } catch (error) {
      console.error(`댓글 ${commentId}에 좋아요를 누르는 중 오류 발생:`, error);
    }
  };

  const handleReplyHeart = async (replyId, commentId) => {
    try {
      await likeReply({ replyId, commentId });

      setComments(comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, likeCount: reply.likeCount + 1 }
                  : reply
              ),
            }
          : comment
      ));
    } catch (error) {
      console.error(`${commentId}번 댓글의 ${replyId}번 대댓글에 좋아요를 누르는 중 오류 발생:`, error);
    }
  };

  const handleReport = (commentId) => {
    console.log(`댓글 ${commentId}가 신고되었습니다.`);
  };

  const handleReportClick = () => {
    console.log(`${albumId}번 게시글이 신고되었습니다`);
  };

  const toggleChat = () => {
    setShowChat(true);
  };

  return showChat ? (
    <Chatting />
  ) : (
    <S.AlbumDetailLayout>
      <S.IconContainer>
        <Link to='/album/bookmark'>
          <Icon id='bookmark' width='26' height='27' />
        </Link>
        <Icon id='message' width='26' height='26' onClick={toggleChat} />
        <Icon
          id='reportbutton'
          width='28'
          height='28'
          onClick={handleReportClick}
        />
      </S.IconContainer>
      <S.Title>앨범 정보</S.Title>
      <S.AlbumComment>{comment}</S.AlbumComment>
      <S.CreatedAt>{formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ko })}</S.CreatedAt>
      <S.StyledHr />

      <S.CommentSectionContainer>
        <S.CommentSection>
          <CommentSection
            key={comments.length}
            comments={comments}
            onReport={handleReport}
            onCommentHeart={handleCommentHeart}
            onReplyHeart={handleReplyHeart}
          />
        </S.CommentSection>

        <S.CommentInputContainer>
          <S.PlusButton>
            <Icon id='plusbutton' width='25' height='25' />
          </S.PlusButton>
          <S.UserProfileImage
            src={profileImage}
            alt='현재 로그인된 사용자 프로필'
          />
          <S.CommentInput
            type='text'
            value={newComment}
            onChange={handleCommentChange}
            placeholder='댓글을 입력하세요...'
          />
          <S.CommentSendButton onClick={handleCommentSubmit}>
            <Icon id='sendbutton' width='26' height='27' />
          </S.CommentSendButton>
        </S.CommentInputContainer>
      </S.CommentSectionContainer>
    </S.AlbumDetailLayout>
  );
};

export default AlbumDetail;
