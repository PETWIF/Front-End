import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth }from '../../../hooks/useAuth.jsx';
import { deleteAccount } from '../../../apis/deleteAccount.js';

import { Button } from '../../../components/Button';
import {
  Checkbox,
  Dropdown,
  Radio,
  RadioGroup,
  TextInput,
} from '../../../components/Input';

import * as S from './DeleteAccountPage.style.jsx';

export default function DeleteAccountPage() {
  const { userId: id } = useAuth();
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value === '삭제합니다') {
      setAgree(true);
    } else {
      setAgree(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem('accessToken');
    // console.log(token);

    // if (!agree) {
    //   return;
    // }

    console.log(id);

    const response = await deleteAccount({ id });
    const { isSuccess } = response;

    if (isSuccess) {
      console.log('탈퇴 완료');
      // 완료 안내 모달 추가
      navigate('/login');
    } else {
      console.log('탈퇴 처리 불가능');
    }
  };

  return (
    <S.SettingLayout>
      <S.Content>
        <S.Fieldset>
          <S.Title>계정 삭제</S.Title>
          <S.Field>
            <S.Text>
              계정을 탈퇴하면 앨범 / 친구 목록 / 사용자 정보 등 계정 내의 모든
              정보 및 활동들이 삭제됩니다. 정말 계정을 삭제하시겠습니까? 정말
              삭제하려면 "삭제합니다" 라고 적어주시기 바랍니다.
            </S.Text>
            <S.InputStyle
              type='text'
              placeholder={`\"삭제합니다\"를 입력해 주세요`}
              onChange={handleInputChange}
            />
          </S.Field>
        </S.Fieldset>
        <Button padding='20px' onClick={handleSubmit} disabled={!agree}>계정 삭제하기</Button>
      </S.Content>
    </S.SettingLayout>
  );
}
