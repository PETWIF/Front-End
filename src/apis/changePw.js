import { authAxios } from '../axios/index.js';

export const patchChangePw = async ({ email, pwd, pwdRe }) => {
    const response = await authAxios.patch(`/member/change/pw`, {
        changePW: pwd,
        checkChangePw: pwdRe,
    },
    {
        params: { email },
    }
);   
    
    return response.data;
};
