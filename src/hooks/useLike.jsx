import { useMutation } from '@tanstack/react-query';

import {
  likeComment as likeCommentApi,
  deleteCommentLike as deleteCommentLikeApi,
} from '../apis/comment.js';

export default function useLike() {
  const likeComment = useMutation({
    mutationFn: ({ commentId }) => likeCommentApi({ commentId }),
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteLikeComment = useMutation({
    mutationFn: ({ commentId }) => deleteCommentLikeApi({ commentId }),
    onError: (error) => {
      console.log(error);
    },
  });

  return { likeComment, deleteLikeComment };
}
