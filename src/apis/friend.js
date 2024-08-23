import { authAxios } from '../axios';

export const requestFriend = async ({ nickname }) => {
  const repsponse = await authAxios.post('/friends/requests', {
    nickname,
  });
  return repsponse;
};

export const acceptFriend = async ({ nickname }) => {
  const repsponse = await authAxios.put('/friends/acceptances', {
    nickname,
  });
  return repsponse;
};

export const rejectFriend = async ({ nickname }) => {
  const repsponse = await authAxios.put('/friends/rejections', {
    nickname,
  });
  return repsponse;
};

export const cancelFriend = async ({ nickname }) => {
  const repsponse = await authAxios.put('/friends/cancellations', {
    nickname,
  });
  return repsponse;
};

export const getFriendList = async ({ page = 0 }) => {
  const repsponse = await authAxios.get('/friends', {
    params: { page },
  });
  return repsponse.data.data.friendList;
};

export const getFriendSentList = async ({ page = 0 }) => {
  const repsponse = await authAxios.get('/friends/status/requests', {
    params: { page },
  });
  return repsponse.data.data.friendList;
};

export const getFriendReceivedList = async ({ page = 0 }) => {
  const repsponse = await authAxios.get('/friends/status/receive-requests', {
    params: { page },
  });
  return repsponse.data.data.friendList;
};

export const getSuggestedFriendList = async ({ page = 0 }) => {
  const repsponse = await authAxios.get('/friends/recommendation', {
    params: { page },
  });
  return repsponse.data.data.recFriendList;
};
