import React, { useState, useEffect } from 'react';
import CommentSection from './CommentSection';
import * as S from './Feed.style';
import { Icon } from '../Icon';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { albumCover } from '../../dummy/images';
import { Link } from 'react-router-dom';

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

  const handleCommentSubmit = () => {
    console.log('새 댓글:', newComment);
    if (newComment.trim()) {
      const newCommentData = {
        id: Date.now(), 
        author: "현재 사용자", // 실제 사용자 이름으로 변경해야함
        profileImage: "/path/to/profile.jpg", // 실제 사용자 프로필 이미지 경로로 변경해야함
        text: newComment,
        likeCount: 0,
        createdAt: '방금',
        replies: [],
      };
  
      const updatedComments = [
        ...comments,
        newCommentData,
      ];
  
      setComments(updatedComments);
      setNewComment('');
    }
  };

  const handleReport = (commentId) => {
    console.log(`댓글 ${commentId}가 신고되었습니다.`);
  };

  const handleAlbumHeart = (albumId) => {
    console.log(`게시글${albumId}에 좋아요를 눌렀습니다.`);
  };

  const handleCommentHeart = (commentId) => {
    console.log(`댓글 ${commentId}에 좋아요를 눌렀습니다.`);
  };

  const handleReplyHeart = (replyId, commentId) => {
    console.log(`${commentId}번 댓글의 ${replyId}번 대댓글에 좋아요를 눌렀습니다.`);
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
