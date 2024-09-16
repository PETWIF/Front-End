import { authAxios } from '../axios/index.js';

export const deleteAccount = async ({ id }) => {
    const response = await authAxios.delete(`/member/delete?id=${id}`, {
        id: id,
    });   
    
    return response.data;
};
