import { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import CommentSection from './CommentSection';
import { Icon } from '../Icon';

import { albumCover, defaultProfile } from '../../dummy/images';

import * as S from './Feed.style';

const likeUsers = [];

const FeedItem = forwardRef((props, ref) => {
  const { data } = props;
  const {
    albumId,
    // bookmarked,
    comments,
    content,
    coverImageUrl,
    likeCount,
    liked,
    memberId,
    nickName,
    profileImageUrl,
    updatedAT,
  } = data;
  const [newComment, setNewComment] = useState('');

  // initialComments.map((comment) => ({
  //   ...comment,
  //   createdAt: formatDistanceToNow(new Date(comment.createdAt), {
  //     addSuffix: true,
  //     locale: ko,
  //   }),
  //   replies: comment.replies
  //     ? comment.replies.map((reply) => ({
  //         ...reply,
  //         createdAt: formatDistanceToNow(new Date(reply.createdAt), {
  //           addSuffix: true,
  //           locale: ko,
  //         }),
  //       }))
  //     : [],
  // }))

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('새 댓글:', newComment);

    if (newComment.trim()) {
      const newCommentData = {
        id: Date.now(),
        author: '현재 사용자', // 실제 사용자 이름으로 변경해야함
        profileImage: '/path/to/profile.jpg', // 실제 사용자 프로필 이미지 경로로 변경해야함
        text: newComment,
        likeCount: 0,
        createdAt: '방금',
        replies: [],
      };

      const updatedComments = [...comments, newCommentData];

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
    <S.FeedItem ref={ref}>
      <S.FeedZone>
        <S.Header>
          <S.Profile>
            <img
              src={profileImageUrl ?? defaultProfile}
              alt={`${nickName} 프로필`}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <S.ProfileName>{nickName}</S.ProfileName>
              <S.CreatedAt>{formatDate(updatedAT)}</S.CreatedAt>
            </div>
          </S.Profile>
          <S.Actions>
            <Link to={`/chatting`}>
              <Icon id='albumdm' width='31' height='32' />
            </Link>
            <Icon
              id={liked ? 'albumheart' : 'heart-line'}
              width='31'
              height='26'
              onClick={() => handleAlbumHeart(data.id)}
            />
            <Link to={`/bookmark`}>
              <Icon id='albumbookmark' width='22' height='27' />
            </Link>
            <Icon id='albumhamburger' width='23' height='4' />
          </S.Actions>
        </S.Header>
        <S.StyledLink key={albumId} to={`/album/detail/${albumId}`}>
          <S.AlbumImage src={coverImageUrl} alt='앨범 이미지' />
        </S.StyledLink>
      </S.FeedZone>

      <S.MainContent>
        <S.Spacer />
        <S.AlbumDetails>
          <S.Likes>
            {likeCount > 0 ? (
              <S.AlbumLikes>
                <img
                  src={likeUsers[0]?.profileImage ?? defaultProfile}
                  alt='profile'
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '10px',
                    borderRadius: '100%',
                  }}
                />
                {likeUsers[0]?.name ?? '알 수 없음'} 님 외 {likeCount - 1}명이
                좋아요를 눌렀어요
              </S.AlbumLikes>
            ) : (
              `${nickName} 외 ${likeCount - 1}명이 좋아요를 눌렀어요`
            )}
          </S.Likes>
          <S.AlbumComment>{content}</S.AlbumComment>
          <S.CreatedAt>{formatDate(updatedAT)}</S.CreatedAt>
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
              <Icon id='plusbutton' width='25' height='25' />
            </S.PlusButton>
            <S.UserProfileImage
              src={profileImageUrl ?? defaultProfile}
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
      </S.MainContent>
    </S.FeedItem>
  );
});

export default FeedItem;
