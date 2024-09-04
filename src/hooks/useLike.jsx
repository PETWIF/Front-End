import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  likeComment as likeCommentApi,
  deleteCommentLike as deleteCommentLikeApi,
} from '../apis/comment.js';

export default function useLike() {
  const queryClient = useQueryClient();

  const likeComment = useMutation({
    mutationFn: ({ commentId }) => likeCommentApi({ commentId }),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(['homeList']);
      queryClient.invalidateQueries(['albumDetail']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteLikeComment = useMutation({
    mutationFn: ({ commentId }) => deleteCommentLikeApi({ commentId }),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(['homeList']);
      queryClient.invalidateQueries(['albumDetail']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { likeComment, deleteLikeComment };
}
