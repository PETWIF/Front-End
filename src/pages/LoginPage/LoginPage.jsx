import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postLogin } from '../../apis/login.js';

import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

import * as S from './LoginPage.style.jsx';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');

  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');

  const [isRightEmail, setIsRightEmail] = useState(false);
  const [isRightPwd, setIsRightPwd] = useState(false);

  const [autoLogin, setAutoLogin] = useState(false); // -> 자동 로그인 체크 여부

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validatePwd = (value) => value.length >= 12;

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'email':
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

    if (!isRightEmail || !isRightPwd) {
      return;
    }

    const response = await postLogin({ email, password });
    const { isSuccess, data } = response;

    if (isSuccess) {
      const { accessToken, refreshToken } = data;

      if (autoLogin) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('autoLogin', 'true');
      }

      navigate('/home');
    } else {
      setEmailError('로그인에 실패했습니다. 다시 시도해 주세요.');
      setPwdError('비밀번호가 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    // 토큰 확인
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedAutoLogin = localStorage.getItem('autoLogin');

    if (storedAccessToken && storedAutoLogin === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  const handleAutoLoginClick = () => {
    setAutoLogin(!autoLogin);
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
                id={autoLogin ? 'checked' : 'unchecked'}
                width='35px'
                height='35px'
                onClick={handleAutoLoginClick} 
              />
              <span>자동 로그인</span>
            </S.AutoLoginContainer>
            <Button
              width='370px'
              padding='18px'
              type='submit'
              buttonStyle='orange'
              disabled={!isRightEmail || !isRightPwd}
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
            <S.SocialLoginContainer id='apple' width='62px' height='62px' />
          </S.SocialLoginWrapper>
          <S.UnderlinedText to='/signup'>
            아직 회원이 아니시라면?
          </S.UnderlinedText>
        </S.FormWrapper>
      </S.Wrapper>
    </main>
  );
}
