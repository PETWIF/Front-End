import React, { useState, useEffect } from 'react';
import CommentSection from './CommentSection';
import * as S from './Feed.style';
import { Icon } from '../Icon';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { albumCover } from '../../dummy/images';
import { Link } from 'react-router-dom';
import { writeComment, likeComment, likeReply } from '../../apis/comment.js';

const FeedItem = ({ data }) => {
  const { profileImage, profileName, albumImage, likeCount, createdAt, comments: initialComments, comment, likeUsers = [] } = data;
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(
    initialComments.map((comment) => ({
      ...comment,
      createdAt: formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ko }),
      replies: comment.replies
        ? comment.replies.map((reply) => ({
            ...reply,
            createdAt: formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: ko }),
          }))
        : [],
    }))
  );

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    console.log('새 댓글:', newComment);
    if (newComment.trim()) {
      try {
        const newCommentData = await writeComment({ albumId: data.id, content: newComment });
        const updatedComments = [
          ...comments,
          {
            ...newCommentData,  // 서버에서 반환한 댓글 데이터를 사용
            createdAt: '방금', // 서버에서 시간을 반환하면 그것을 사용
            replies: [],
          },
        ];
        setComments(updatedComments);
        setNewComment('');
      } catch (error) {
        console.error('댓글 작성 실패:', error);
        alert(`댓글 작성 중 오류가 발생했습니다: ${error.message}`);
      }
    }
  };
  

  const handleReport = (commentId) => {
    console.log(`댓글 ${commentId}가 신고되었습니다.`);
  };

  const handleAlbumHeart = (albumId) => {
    console.log(`게시글${albumId}에 좋아요를 눌렀습니다.`);
  };

  const handleCommentHeart = async (commentId) => {
    try {
      const response = await likeComment({ commentId });
      console.log(`댓글 ${commentId}에 좋아요를 눌렀습니다.`, response);
  
      // 필요에 따라 상태를 업데이트하거나 UI를 변경합니다.
      // 예를 들어, 해당 댓글의 좋아요 수를 증가시킬 수 있습니다.
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? { ...comment, likeCount: comment.likeCount + 1 }
            : comment
        )
      );
    } catch (error) {
      console.error(`댓글 ${commentId}에 좋아요를 누르는 중 오류 발생:`, error);
    }
  };

  const handleReplyHeart = async (replyId, commentId) => {
    try {
      const response = await likeReply({ replyId, commentId });
      console.log(`${commentId}번 댓글의 ${replyId}번 대댓글에 좋아요를 눌렀습니다.`, response);
  
      // 필요에 따라 상태를 업데이트하거나 UI를 변경합니다.
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply.id === replyId
                    ? { ...reply, likeCount: reply.likeCount + 1 }
                    : reply
                ),
              }
            : comment
        )
      );
    } catch (error) {
      console.error(`대댓글 ${replyId}에 좋아요를 누르는 중 오류 발생:`, error);
    }
  };

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  return (
    <S.FeedItem>
      <S.FeedZone>
        <S.Header>
          <S.Profile>
            <img src={profileImage} alt={`${profileName} 프로필`} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <S.ProfileName>{profileName}</S.ProfileName>
              <S.CreatedAt>{formatDate(createdAt)}</S.CreatedAt>
            </div>
          </S.Profile>
          <S.Actions>
            <Link to={`/chatting`}>
              <Icon id='albumdm' width='31' height='32' />
            </Link>
              <Icon id='albumheart' width='31' height='26' onClick={() => handleAlbumHeart(data.id)}/>
            <Link to={`/bookmark`}>
              <Icon id='albumbookmark' width='22' height='27' />
            </Link>
            <Icon id='albumhamburger' width='23' height='4' />
          </S.Actions>
        </S.Header>
        <S.StyledLink key={data.id} to={`/album/detail/${data.id}`}>
          <S.AlbumImage src={albumCover} alt="앨범 이미지" />
        </S.StyledLink>
      </S.FeedZone>


      <S.MainContent>
        <S.Spacer />
        <S.AlbumDetails>
          <S.Likes>
            {likeUsers.length > 0 ? (
              <S.AlbumLikes>
                <img 
                  src={likeUsers[0].profileImage} 
                  alt={`${likeUsers[0].name} 프로필`} 
                  style={{ width: '20px', height: '20px', borderRadius: '50%' }} 
                />
                {likeUsers[0].name} 외 {likeCount - 1}명이 좋아요를 눌렀어요
              </S.AlbumLikes>
            ) : (
              `${profileName} 외 ${likeCount - 1}명이 좋아요를 눌렀어요`
            )}
          </S.Likes>
          <S.AlbumComment>{comment}</S.AlbumComment>
          <S.CreatedAt>{formatDate(createdAt)}</S.CreatedAt>
        </S.AlbumDetails>

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
        </S.MainContent>
    </S.FeedItem>
  );
};

export default FeedItem;
