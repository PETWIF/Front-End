import { authAxios } from '../axios';

export const getSuggestedFriendList = async () => {
  const repsponse = await authAxios.get('/friends/recommendation');
  return repsponse.data.data.recFriendList;
};
