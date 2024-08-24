import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import {
  requestFriend,
  cancelFriend,
  acceptFriend,
  rejectFriend,
  removeFriend,
} from '../apis/friend.js';

export default function useFriend() {
  const queryClient = useQueryClient();

  const request = useMutation({
    mutationFn: (nickname) => requestFriend({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestedFriendList']);
      queryClient.invalidateQueries(['friendSentList']);
    },
  });

  const cancel = useMutation({
    mutationFn: (nickname) => cancelFriend({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendSentList']);
    },
  });

  const accept = useMutation({
    mutationFn: (nickname) => acceptFriend({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendReceivedList']);
      queryClient.invalidateQueries(['friendList']);
    },
  });

  const reject = useMutation({
    mutationFn: (nickname) => rejectFriend({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendReceivedList']);
    },
  });

  const remove = useMutation({
    mutationFn: (nickname) => removeFriend({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendList']);
    },
  });

  return { request, cancel, accept, reject, remove };
}
