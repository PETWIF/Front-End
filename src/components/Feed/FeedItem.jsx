import { forwardRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import useLike from '../../hooks/useLike.jsx';

import CommentSection from './CommentSection';
import { Icon } from '../Icon';

import { postReportComment, postReportAlbum } from '../../apis/report.js';
import { block } from '../../apis/block.js';

import useReportModal from '../../hooks/useReportModal.jsx';

import { albumCover, defaultProfile } from '../../dummy/images';

import { authAxios } from '../../axios/index.js';

import * as S from './Feed.style';

const likeUsers = [];

const FeedItem = forwardRef((props, ref) => {
  const { likeAlbum, deleteLikeAlbum } = useLike();
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

  const { isOpen, open, close, ReportModal } = useReportModal();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleCommentSubmit = async () => {
    console.log('새 댓글:', newComment, albumId);
    console.log(
      `Sending POST request to: ${import.meta.env.VITE_SERVER_DOMAIN}/albums/${albumId}/comment`
    );

    if (newComment.trim()) {
      try {
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('content', newComment);

        const response = await authAxios.post(
          `/albums/${albumId}/comment`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // form-data 전송을 위한 Content-Type
              // Authorization 헤더는 authAxios 인스턴스에서 이미 설정되어 있으므로, 여기서는 필요 없음
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          const newCommentData = {
            id: response.data.id,
            author: '현재 사용자',
            profileImage: '/path/to/profile.jpg',
            text: newComment,
            likeCount: 0,
            createdAt: '방금',
            replies: [],
          };
        }
      } catch (error) {
        console.error('댓글 전송 중 오류 발생:', error);
      }
    }
  };

  const handleReportComment = async (commentId) => {
    const response = await postReportComment({ commentId, content });
    const { isSuccess, data } = response;

    if (isSuccess) {
      console.log('댓글 신고 완료:', data);
      open();
    } else {
      console.log('에러 발생');
    }
  };

  const handleReportAlbum = async () => {
    setIsMenuOpen(false);
    const reportReason = '부적절한 게시물'; // 임시 사유
    const response = await postReportAlbum({ albumId, reportReason });
    const { isSuccess, data } = response;

    if (isSuccess) {
      console.log('앨범 신고 완료:', data);
      open();
    } else {
      console.log('에러 발생');
    }
  };

  const handleAlbumHeart = (albumId) => {
    console.log(`게시글${albumId}에 좋아요를 눌렀습니다.`);
  };

  const handleBlockUser = async () => {
    setIsMenuOpen(false);
    const response = await block({ nickName });
    const { isSuccess, data } = response;

    if (isSuccess) {
      console.log('사용자 차단 완료:', data);
    } else {
      console.log('에러 발생');
    }
  };

  const handleCommentHeart = (commentId) => {
    console.log(`댓글 ${commentId}에 좋아요를 눌렀습니다.`);
  };

  const handleReplyHeart = (replyId, commentId) => {
    console.log(
      `${commentId}번 댓글의 ${replyId}번 대댓글에 좋아요를 눌렀습니다.`
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // 메뉴 열림/닫힘 상태 토글
  };

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  return (
    <>
      <S.FeedItem ref={ref}>
        <S.FeedZone>
          <S.Header>
            <Link to={`/album/${nickName}`}>
              <S.Profile>
                <img
                  src={profileImageUrl ?? defaultProfile}
                  alt={`${nickName} 프로필`}
                />
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <S.ProfileName>{nickName}</S.ProfileName>
                  <S.CreatedAt>{formatDate(updatedAT)}</S.CreatedAt>
                </div>
              </S.Profile>
            </Link>
            <S.Actions>
              <Link to={`/chatting`}>
                <Icon id='albumdm' width='31' height='32' />
              </Link>
              <Icon
                id={liked ? 'albumheart' : 'heart-line'}
                width='31'
                height='26'
                onClick={() =>
                  liked
                    ? deleteLikeAlbum.mutate({ albumId: data.albumId })
                    : likeAlbum.mutate({ albumId: data.albumId })
                }
              />
              <Link to={`/bookmark`}>
                <Icon id='albumbookmark' width='22' height='27' />
              </Link>
              <Icon
                id='albumhamburger'
                width='23'
                height='4'
                onClick={toggleMenu}
              />
              {isMenuOpen && ( // 메뉴 열림 상태일 때 메뉴 표시
                <div
                  className='menu'
                  style={{
                    position: 'relative',
                    top: '50px', // 버튼 바로 아래에 위치하게 함
                    left: '10px',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    zIndex: 1,
                  }}
                >
                  <ul
                    style={{ listStyle: 'none', margin: 0, padding: '8px 0' }}
                  >
                    <li
                      onClick={handleReportAlbum}
                      style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        ':hover': { backgroundColor: '#f5f5f5' },
                      }}
                    >
                      신고
                    </li>
                    <li
                      onClick={handleBlockUser}
                      style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        ':hover': { backgroundColor: '#f5f5f5' },
                      }}
                    >
                      차단
                    </li>
                  </ul>
                </div>
              )}
            </S.Actions>
          </S.Header>
          <S.StyledLink
            key={albumId}
            to={`/album/${nickName}/detail/${albumId}`}
          >
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
                onReport={handleReportComment}
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
      {isOpen && <ReportModal type='warning' close={close} />}
    </>
  );
});

export default FeedItem;
