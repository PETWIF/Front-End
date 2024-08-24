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
    const response = await authAxios.post(`pet/add`, {
        petName: petName,
        gender: petGender,
        age: petAgeInt,
        petKind: petKind,
    });   
    
    return response.data.isSuccess;
};