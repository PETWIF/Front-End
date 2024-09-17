import { useQueryClient, useMutation } from '@tanstack/react-query';

import {
  likeComment as likeCommentApi,
  deleteCommentLike as deleteCommentLikeApi,
} from '../apis/comment.js';

import {
  likeAlbum as likeAlbumApi,
  deleteAlbumLike as deleteAlbumLikeApi,
} from '../apis/album.js';

export default function useLike() {
  const queryClient = useQueryClient();

  const likeComment = useMutation({
    mutationFn: ({ commentId }) => likeCommentApi({ commentId }),
    onSuccess: (res) => {
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
      queryClient.invalidateQueries(['homeList']);
      queryClient.invalidateQueries(['albumDetail']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const likeAlbum = useMutation({
    mutationFn: ({ albumId }) => likeAlbumApi({ albumId }),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(['homeList']);
      queryClient.invalidateQueries(['albumList']);
      queryClient.invalidateQueries(['albumDetail']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const deleteLikeAlbum = useMutation({
    mutationFn: ({ albumId }) => deleteAlbumLikeApi({ albumId }),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(['homeList']);
      queryClient.invalidateQueries(['albumList']);
      queryClient.invalidateQueries(['albumDetail']);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { likeComment, deleteLikeComment, likeAlbum, deleteLikeAlbum };
}
