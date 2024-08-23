import { authAxios } from '../axios';

export const getFriendList = async () => {
  const repsponse = await authAxios.get('/friends');
  return repsponse.data.data.friendList;
};

export const getSuggestedFriendList = async () => {
  const repsponse = await authAxios.get('/friends/recommendation');
  return repsponse.data.data.recFriendList;
};
