import { authAxios } from '../axios';

export const getFriendList = async ({ page = 0 }) => {
  const repsponse = await authAxios.get('/friends', {
    params: { page },
  });
  return repsponse.data.data.friendList;
};

export const requestFriend = async ({ nickname }) => {
  const repsponse = await authAxios.post('/friends/requests', {
    nickname,
  });
  return repsponse;
};

export const getSuggestedFriendList = async ({ page = 0 }) => {
  const repsponse = await authAxios.get('/friends/recommendation', {
    params: { page },
  });
  return repsponse.data.data.recFriendList;
};
