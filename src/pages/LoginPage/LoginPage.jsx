import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockPostLogin } from '../../dummy/data/user.js';

import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

import useCheckIcon from '../../hooks/useCheckIcon.jsx';

import * as S from './LoginPage.style.jsx';

export default function LoginPage() {
  const { isChecked, checking } = useCheckIcon();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');

  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');

  const [isRightEmail, setIsRightEmail] = useState(false);
  const [isRightPwd, setIsRightPwd] = useState(false);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validatePwd = (value) => value.length >= 4 && value.length <= 12;

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'email':
        console.log({ email });
        setEmail(value);
        const isValidEmail = validateEmail(value);
        setIsRightEmail(isValidEmail);
        break;
      case 'pwd':
        setPwd(value);
        const isValidPwd = validatePwd(value);
        setIsRightPwd(isValidPwd);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isRightEmail || !isRightPwd) {
    //       return;
    // }

    try {
      await mockPostLogin({ email, password });
      navigate('/home');
      console.log('로그인 성공:', { email, password });
    } catch (error) {
      console.log({ email });
      console.error('로그인 실패:', error.message);
      if (error.message === 'User not found') {
        setEmailError('이메일이 등록되어 있지 않습니다.');
      } else if (error.message === 'Incorrect password') {
        setPwdError('비밀번호가 틀렸습니다.');
      }
    }
  };

  return (
    <main>
      <S.Wrapper>
        <S.PETWIFContainer $direction='column'>
          <Icon id='logo' width='293px' height='58px' />
          <S.MainBoldText>
            반려동물과의 추억을 사람들과 나눠 보세요
          </S.MainBoldText>
          <S.MockUp />
        </S.PETWIFContainer>
        <S.FormWrapper>
          <S.FormContainer onSubmit={handleSubmit}>
            <S.InputContainer>
              <S.MainBoldText>이메일</S.MainBoldText>
              <S.InputStyle
                id='email'
                type='text'
                className='email'
                placeholder='이메일을 입력해 주세요'
                onChange={handleInputChange}
              />
              <S.WarningText className={isRightEmail ? 'success' : 'error'}>
                {emailError}
              </S.WarningText>
            </S.InputContainer>
            <S.InputContainer>
              <S.MainBoldText>비밀번호</S.MainBoldText>
              <S.InputStyle
                id='pwd'
                type='password'
                className='pwd'
                placeholder='비밀번호를 입력해 주세요'
                onChange={handleInputChange}
              />
              <S.WarningText className={isRightPwd ? 'success' : 'error'}>
                {pwdError}
              </S.WarningText>
            </S.InputContainer>
            <S.AutoLoginContainer>
              <Icon
                id={isChecked ? 'check' : 'uncheck'}
                width='35px'
                height='35px'
                onClick={checking}
              />
              <span>자동 로그인</span>
            </S.AutoLoginContainer>
            <Button
              width='370px'
              padding='18px'
              type='submit'
              buttonStyle={isRightEmail && isRightPwd ? 'orange' : 'gray'}
            >
              로그인
            </Button>
          </S.FormContainer>
          <S.UnderlinedText to='/searchPwd'>
            비밀번호를 잃어버리셨나요?
          </S.UnderlinedText>
          <S.StyledHr />
          <S.MainBoldText>간편 로그인</S.MainBoldText>
          <S.SocialLoginWrapper>
            <S.SocialLoginContainer id='kakao' width='62px' height='62px' />
            <S.SocialLoginContainer id='naver' width='62px' height='62px' />
            <S.SocialLoginContainer id='apple' width='62px' height='62px' />
            <S.SocialLoginContainer id='google' width='62px' height='62px' />
          </S.SocialLoginWrapper>
          <S.UnderlinedText to='/signup'>
            아직 회원이 아니시라면?
          </S.UnderlinedText>
        </S.FormWrapper>
      </S.Wrapper>
    </main>
  );
}
