import { authAxios } from '../axios/index.js';

export const patchAddUserInfo = async ({ gender, birthDate, telecom, phone, address }) => {
    const response = await authAxios.patch(`/member/addEtc`, {
        gender: gender,
        birthDate: birthDate,
        telecom: telecom,
        phoneNum: phone,
        address: address,
    });   
    
    return response.data;
};

export const postAddPetInfo = async ({ petName, petGender, petAge, petKind }) => {
    const requestBody = [
        {
            petName: petName,
            gender: petGender,
            age: parseInt(petAge, 10),
            petKind: petKind,
        }
    ];
    const response = await authAxios.post(`/pet/add/beforeLogin`,
        requestBody,
    );

    return response.data;
};

export const patchAddUserInfoBeforeLogin = async ({ email, gender, birthDate, telecom, phone, address }) => {
    const response = await authAxios.patch(`/member/addEtc/beforeLogin`, {
        gender: gender,
        birthDate: birthDate,
        telecom: telecom,
        phoneNum: phone,
        address: address
    },
    {
        params: { email },
    });   
    
    return response.data;
};

export const postAddPetInfoBeforeLogin = async ({ email, petName, petGender, petAge, petKind }) => {
    const requestBody = [
        {
            petName: petName,
            gender: petGender,
            age: parseInt(petAge, 10),
            petKind: petKind,
        }
    ];
    const response = await authAxios.post(`/pet/add/beforeLogin`,
        requestBody,
        {
            params: { email }, 
        }
    );

    return response.data;
};
