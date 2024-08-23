import { authAxios } from '../axios';

export const getFriendList = async ({ page = 0 }) => {
  const repsponse = await authAxios.get('/friends', {
    params: { page },
  });
  return repsponse.data.data.friendList;
};

export const getSuggestedFriendList = async () => {
  const repsponse = await authAxios.get('/friends/recommendation');
  return repsponse.data.data.recFriendList;
};
