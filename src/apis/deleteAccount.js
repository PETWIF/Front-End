import { authAxios } from '../axios/index.js';

// export const getMyId = async ({token}) => {
//     const response = await authAxios.get(`/member/me`, {
//         Authorization: token,
//     });   

//     return response.data;
// };

export const deleteAccount = async ({ id }) => {
    const response = await authAxios.delete(`/member/delete?id=${id}`, {
        id: id,
    });   
    
    return response.data;
};
