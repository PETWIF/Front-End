import React from 'react';
import CommentSection from './CommentSection';
import * as S from './Feed.style';
import { Icon } from '../Icon';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import dummyImg from '../../dummy/images/dummyImg.svg'; 

const FeedItem = ({ data }) => {
  const { profileImage, profileName, albumImage, likeCount, createdAt, comments, comment, likeUsers = [] } = data;
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
            <Icon id='albumdm' width='31' height='32' />
            <Icon id='albumheart' width='31' height='26' />
            <Icon id='albumbookmark' width='22' height='27' />
            <Icon id='albumhamburger' width='23' height='4' />
          </S.Actions>
        </S.Header>
        <S.AlbumImage src={dummyImg} alt="앨범 이미지" />
      </S.FeedZone>


      <S.MainContent>
        <S.Spacer />
        <S.AlbumDetails>
          <S.Likes>
            {likeUsers.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <img 
                  src={likeUsers[0].profileImage} 
                  alt={`${likeUsers[0].name} 프로필`} 
                  style={{ width: '20px', height: '20px', borderRadius: '50%' }} 
                />
                {likeUsers[0].name} 외 {likeCount - 1}명이 좋아요를 눌렀어요
              </div>
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
        </S.MainContent>
    </S.FeedItem>
  );
};

export default FeedItem;
