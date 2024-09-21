import { useState } from 'react';
import useLike from '../../hooks/useLike.jsx';
import { Icon } from '../Icon';
import * as S from './CommentSection.style';

const CommentSection = ({ comments, onReport }) => {
  const { likeComment, deleteLikeComment } = useLike();

  const [commentList, setCommentList] = useState(comments);
  const [newReply, setNewReply] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});

  const handleCommentLike = ({ isLike, commentId }) => {
    if (isLike) {
      deleteLikeComment.mutate({ commentId });
      return;
    }

    likeComment.mutate({ commentId });
  };

  const handleReplyChange = (commentId, e) => {
    setNewReply({
      ...newReply,
      [commentId]: e.target.value,
    });
  };

  const handleReplySubmit = (commentId) => {
    const replyText = newReply[commentId];

    if (replyText.trim()) {
      const updatedComments = commentList.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                name: '현재 사용자', // 실제 사용자 이름으로 변경해야 함
                profileImage: '/path/to/profile.jpg', // 실제 사용자 프로필 이미지 경로로 변경해야 함
                content: replyText, // 대댓글 내용 업데이트
                likeCount: 0,
                createdAt: '방금',
              },
            ],
          };
        }
        return comment;
      });

      setCommentList(updatedComments);

      // 대댓글 등록 후 입력창만 닫습니다.
      setShowReplyInput({
        ...showReplyInput,
        [commentId]: false,
      });

      setNewReply({
        ...newReply,
        [commentId]: '',
      });
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
        ...prevShowReplyInput,
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
                src={comment.profileImage || '/default/profile.jpg'} // 기본 프로필 이미지 경로 설정
                alt={`${comment.name} 프로필`} // API에서 반환되는 name 사용
              />
              {comment.name} {/* API에서 반환되는 name 사용 */}
            </S.CommentAuthor>
            <S.ReportButton onClick={() => onReport(comment.id)}>
              신고
            </S.ReportButton>
          </S.CommentHeader>
          <S.CommentText>{comment.content}</S.CommentText> {/* API에서 반환되는 content 사용 */}
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
            {comment.replies && comment.replies.length > 0 && (
              <span>{comment.replies.length}</span>
            )}
            <S.CommentCreatedAt>{comment.createdAt}</S.CommentCreatedAt>
          </S.CommentActions>
          {showReplies[comment.id] && (
            <>
              {comment.replies && comment.replies.length > 0 && (
                <S.Replies>
                  {comment.replies.map((reply) => (
                    <S.Reply key={reply.id}>
                      <S.ReplyAuthor>
                        <S.ProfileImage
                          src={reply.profileImage}
                          alt={`${reply.name} 프로필`} // 대댓글 작성자 이름 표시
                        />
                        {reply.name} {/* 대댓글 작성자 이름 표시 */}
                      </S.ReplyAuthor>
                      <S.ReplyText>{reply.content}</S.ReplyText> {/* 대댓글 내용 표시 */}
                      <S.ReplyActions>
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
                        ></Icon>
                        {reply.likeCount}
                        <S.CommentCreatedAt>
                          {reply.createdAt}
                        </S.CommentCreatedAt>
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
                  />
                  <S.ReplyButton onClick={() => handleReplySubmit(comment.id)}>
                    등록
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
