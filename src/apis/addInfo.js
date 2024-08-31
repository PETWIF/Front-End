import { authAxios } from '../axios/index.js';

export const patchAddUserInfo = async ({ gender, birthDate, telecom, phone, address }) => {
    const response = await authAxios.patch(`/member/addEtc`, {
        gender: gender,
        birthDate: birthDate,
        telecom: telecom,
        phoneNum: phone,
        address: address,
    });   
    
    return response.data.isSuccess;
};

export const postAddPetInfo = async ({ petName, petGender, petAgeInt, petKind }) => {
    const response = await authAxios.post(`/pet/add`, {
        petName: petName,
        gender: petGender,
        age: petAgeInt,
        petKind: petKind,
    },
    {
        params: { token },
    });   
    
    return response.data.isSuccess;
};

export const patchAddUserInfoBeforeLogin = async ({ email, gender, birthDate, telecom, phone, address }) => {
    const response = await authAxios.patch(`/member/addEtc/beforeLogin`, {
        gender: gender,
        birthDate: birthDate,
        telecom: telecom,
        phoneNum: phone,
        address: address,
    },
    {
        params: { email },
    });   
    
    return response.data.isSuccess;
};

export const postAddPetInfoBeforeLogin = async ({ email, petName, petGender, petAgeInt, petKind }) => {
    const response = await authAxios.post(`/pet/add/beforeLogin`, {
        petName: petName,
        gender: petGender,
        age: petAgeInt,
        petKind: petKind,
    },
    {
        params: { email },
    });   
    
    return response.data.isSuccess;
};