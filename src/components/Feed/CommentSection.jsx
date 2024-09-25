import { useState } from 'react';
import { authAxios } from '../../axios';
import useLike from '../../hooks/useLike.jsx';
import { Icon } from '../Icon';
import * as S from './CommentSection.style';

const CommentSection = ({ comments, onReport, albumId }) => {
  const { likeComment, deleteLikeComment } = useLike();

  const [commentList, setCommentList] = useState(comments);
  const [newReply, setNewReply] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const handleReplyChange = (commentId, e) => {
    setNewReply({
      ...newReply,
      [commentId]: e.target.value,
    });
  };

  const handleReplySubmit = async (commentId) => {
    const replyText = newReply[commentId];
  
    if (replyText.trim()) {
      console.log('새 대댓글:', replyText, albumId, commentId);
      console.log(`Sending POST request to: ${import.meta.env.VITE_SERVER_DOMAIN}/albums/${albumId}/comment?parentCommentId=${commentId}`);
  
      try {
        // 사용자 이름 가져오기
        const userResponse = await authAxios.get('/member/me/withAuth');
        const username = userResponse.data.isSuccess ? userResponse.data.data.name : '현재 사용자';
  
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('content', replyText);
  
        const response = await authAxios.post(
          `/albums/${albumId}/comment?parentCommentId=${commentId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        if (response.status === 200 || response.status === 201) {
          const newReplyData = {
            id: response.data.data.id,
            name: username, // 사용자 이름 반영
            content: replyText,
            likeCount: 0,
            createdAt: new Date().toISOString(),
          };
  
          // 댓글 리스트 업데이트
          const updatedComments = commentList.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                childComments: [
                  ...comment.childComments,
                  newReplyData,
                ],
              };
            }
            return comment;
          });
  
          setCommentList(updatedComments);
          setNewReply({
            ...newReply,
            [commentId]: '',
          });
        }
      } catch (error) {
        console.error('대댓글 등록 중 오류 발생:', error);
      }
    }
  };
  

  const toggleShowReplies = (commentId) => {
    const newShowReplies = !showReplies[commentId];
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: newShowReplies,
    }));

    if (newShowReplies) {
      setShowReplyInput((prevShowReplyInput) => ({
        ...prevShowReplyInput,
        [commentId]: true,
      }));
    } else {
      setShowReplyInput((prevShowReplyInput) => ({
        [commentId]: false,
      }));
    }
  };

  return (
    <S.CommentSection>
      {commentList.map((comment) => (
        <S.Comment key={comment.id}>
          <S.CommentHeader>
            <S.CommentAuthor>
              <S.ProfileImage
                src={comment.profileImage || '/default/profile.jpg'}
                alt={`${comment.name} 프로필`}
              />
              {comment.name}
            </S.CommentAuthor>
            <S.ReportButton onClick={() => onReport(comment.id)}>
              신고
            </S.ReportButton>
          </S.CommentHeader>
          <S.CommentText>{comment.content}</S.CommentText>
          <S.CommentActions>
            <Icon
              id="commentheart"
              width="14"
              height="12"
              onClick={() =>
                handleCommentLike({
                  isLike: comment.liked,
                  commentId: comment.id,
                })
              }
            />
            <span>{comment.likeCount}</span>
            <Icon
              id="replybutton"
              width="13"
              height="12"
              onClick={() => toggleShowReplies(comment.id)}
            />
            {comment.childComments && comment.childComments.length > 0 && (
              <span>{comment.childComments.length}</span>
            )}
            <S.CommentCreatedAt>{comment.createdAt}</S.CommentCreatedAt>
          </S.CommentActions>
          {showReplies[comment.id] && (
            <>
              {comment.childComments && comment.childComments.length > 0 && (
                <S.Replies>
                  {comment.childComments.map((reply) => (
                    <S.Reply key={reply.id}>
                      <S.ReplyAuthor>
                        <S.ProfileImage
                          src={reply.profileImage || '/default/profile.jpg'}
                          alt={`${reply.name} 프로필`}
                        />
                        {reply.name}
                      </S.ReplyAuthor>
                      <S.ReplyText>{reply.content}</S.ReplyText>
                      <S.ReplyActions>
                        <Icon
                          id="commentheart"
                          width="14"
                          height="12"
                          onClick={() =>
                            handleCommentLike({
                              isLike: reply.liked,
                              commentId: reply.id,
                            })
                          }
                        />
                        {reply.likeCount}
                        <S.CommentCreatedAt>{reply.createdAt}</S.CommentCreatedAt>
                      </S.ReplyActions>
                    </S.Reply>
                  ))}
                </S.Replies>
              )}
              {showReplyInput[comment.id] && (
                <S.ReplySection>
                  <S.ReplyInput
                    type="text"
                    value={newReply[comment.id] || ''}
                    onChange={(e) => handleReplyChange(comment.id, e)}
                    placeholder="대댓글을 입력하세요..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleReplySubmit(comment.id);
                      }
                    }}
                  />
                  <S.ReplyButton
                    onClick={() => handleReplySubmit(comment.id)}
                    disabled={loading} // 로딩 중이면 버튼 비활성화
                  >
                    {loading ? '등록 중...' : '등록'}
                  </S.ReplyButton>
                </S.ReplySection>
              )}
            </>
          )}
        </S.Comment>
      ))}
    </S.CommentSection>
  );
};

export default CommentSection;
