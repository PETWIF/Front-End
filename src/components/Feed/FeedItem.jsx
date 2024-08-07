import React from 'react';
import CommentSection from './CommentSection';
import * as S from './Feed.style';
import { FaHeart, FaBookmark, FaRegEnvelope, FaEllipsisH } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import dummyImg from './Icons/dummyImg.svg';

const FeedItem = ({ data }) => {
  const { profileImage, profileName, albumImage, likeCount, createdAt, comments, comment, likeUsers = [] } = data;
  const [newComment, setNewComment] = React.useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // 댓글 제출 로직
    console.log('새 댓글:', newComment);
    setNewComment('');
  };

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  return (
    <S.FeedItem>
      <S.Header>
        <S.Profile>
          <img src={profileImage} alt={`${profileName} 프로필`} />
          <div>
            <S.ProfileName>{profileName}</S.ProfileName>
            <S.CreatedAt>{formatDate(createdAt)}</S.CreatedAt>
          </div>
          <S.Actions>
            <FaRegEnvelope />
            <FaHeart />
            <FaBookmark />
            <FaEllipsisH />
          </S.Actions>
        </S.Profile>
      </S.Header>
      <S.MainContent>
        <S.AlbumImage src={dummyImg} alt="앨범 이미지" />
        <S.AlbumDetails>
          <div>
            <S.Likes>
              {likeUsers.length > 0 ? (
                <>
                  <img src={likeUsers[0].profileImage} alt={`${likeUsers[0].name} 프로필`} style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '5px' }} />
                  {likeUsers[0].name} 외 {likeCount - 1}명이 좋아요를 눌렀어요
                </>
              ) : (
                `${profileName} 외 ${likeCount - 1}명이 좋아요를 눌렀어요`
              )}
            </S.Likes>
            <S.AlbumComment>{comment}</S.AlbumComment>
            <S.CreatedAt>{formatDate(createdAt)}</S.CreatedAt>
            <hr />
            <S.CommentSectionContainer>
              <CommentSection comments={comments.map((comment) => ({
                ...comment,
                createdAt: formatDate(comment.createdAt),
              }))} />
            </S.CommentSectionContainer>
          </div>
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
        </S.AlbumDetails>
      </S.MainContent>
    </S.FeedItem>
  );
};

export default FeedItem;
