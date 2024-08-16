import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { mockPostSetNickname } from '../../dummy/data/user.js';

import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';

import { Profile as Img } from '../../dummy/images';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './SetNicknamePage.style.jsx';

export default function SetNicknamePage() {
  const [nickname, setNickname] = useState('');
  const [isRightNickname, setIsRightNickname] = useState(false);
  const validateNickname = (value) => value.trim().length >= 2 && value.trim().length <= 6;

  const formData = { nickname: nickname };
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'nickname':
        setNickname(value);
        const isValidNickname = validateNickname(value);
        setIsRightNickname(isValidNickname);
        break;
      }
    }

    const handleSubmit = async (e, destination) => {
      e.preventDefault();
  
      if (!isRightNickname) return;
  
      try {
        console.log('Form data submitted:', formData);
        await mockPostSetNickname(email, formData);
        navigate(destination, { state: { email, password, nickname: nickname } });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
            <TitleContainer to='/agree' backIcon='true' titleText='프로필' />
            <S.FormContainer onSubmit={(e) => handleSubmit(e, '/addInfo')}>
            <Avatar src={Img} size='212px' />
            <S.InputContainer>
              <S.MainBoldText>닉네임</S.MainBoldText>
              <S.MainNormalText>
                닉네임은 영어, 숫자, 특수문자로 이루어진 2~6자로 만들 수 있어요
              </S.MainNormalText>
              <S.InputStyle id='nickname' placeholder='닉네임을 입력해 주세요(특수문자는 _만 가능)' onChange={handleInputChange}/>
              </S.InputContainer>
              <br />
              <S.MainBoldText>추가 정보 입력</S.MainBoldText>
              <S.StyledHr />
              <Button width='450px' padding='16px' buttonStyle='orange' onClick={(e) => handleSubmit(e, '/addInfo')}>
                지금 입력
              </Button>
              <Button width='450px' padding='16px' buttonStyle='gray' onClick={(e) => handleSubmit(e, '/home')}>
                나중에 하기
              </Button>
            </S.FormContainer>
          </S.FormWrapper>
          <Link to='/login'>
            <Button
              width='450px'
              padding='20px'
              borderRadius='0'
              buttonStyle='light'
              hasBorder='true'
            >
              계정이 있으신가요? 로그인
            </Button>
          </Link>
        </S.Container>
      </S.Wrapper>
    </main>
  );
}
