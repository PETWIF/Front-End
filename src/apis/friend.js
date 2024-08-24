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

export const removeFriend = async ({ nickname }) => {
  const repsponse = await authAxios.delete('/friends', {
    params: { nickname },
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

export const getFriendStatus = async ({ nickname }) => {
  const response = await authAxios.get(`/friends/status`, {
    params: { nickname },
  });
  return response.data.data.status;
};
