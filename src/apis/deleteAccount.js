import { authAxios } from '../axios/index.js';

export const getMyId = async () => {
    const response = await authAxios.get(`/member/me`, {
        Authorization: localStorage.getItem('token'),
    });   
    
    return response.data;
};

export const deleteAccount = async ({ userId }) => {
    const response = await authAxios.delete(`/member/delete?id=${id}`, {
        id: userId,
    });   
    
    return response.data;
};
