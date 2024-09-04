import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import { postGoogleLogin, postKakaoLogin } from '../../apis/login.js'; // useAuth로 옮겨야 함

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

  const { isLogin, handleLogin } = useAuth(); // 로그인 설정
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

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize
?client_id=290e9622e67ae7945bf3ba677f42dc48
&redirect_uri=http://localhost:8080/kakaoLogin
&response_type=code`;
};

  const KakaoLoginCallback = async () => {
    const kakaoCode = new URL(dococument.location.toString()).searchParams.get(`code`);
    console.log(kakaoCode);

    if (kakaoCode) {
        const response = await postKakaoLogin(kakaoCode);
        const { isSuccess, data } = response;

        if (isSuccess) {
            const { accessToken, refreshToken } = data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            navigate('/home');
        } else {
            setEmailError('로그인에 실패했습니다. 다시 시도해 주세요.');
        }
    } else {
        setEmailError('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
};


  const handleGoogleLogin = async () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?
    client_id=928539400314-fsf7hhtt5mbqvpa8slt5iae561c99mpc.apps.googleusercontent.com
    &redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code
    &scope=https://www.googleapis.com/auth/userinfo.email 
    https://www.googleapis.com/auth/userinfo.profile`;
  };

  const GoogleLoginCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleCode = urlParams.get('code');
    console.log(googleCode);
  
    const response = await postGoogleLogin(googleCode);
    const { isSuccess, data } = response;

    if (isSuccess) {
      const { accessToken, refreshToken } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/home');
    } else {
      setEmailError('로그인에 실패했습니다. 다시 시도해 주세요.');
      setPwdError('비밀번호가 일치하지 않습니다.');
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isRightEmail || !isRightPwd) {
      return;
    }

    try {
      await handleLogin({ email, password, autoLogin });
    } catch (error) {
      console.log(error);
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
          <S.MockUp>
              <Icon id='mockup' width='620px' height='620px' />
          </S.MockUp>
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
            <S.SocialLoginContainer id='kakao' width='62px' height='62px' onClick={() => {handleKakaoLogin(); KakaoLoginCallback();}}/>
            <S.SocialLoginContainer id='google' width='62px' height='62px' onClick={() => {handleGoogleLogin(); GoogleLoginCallback();}}/>
          </S.SocialLoginWrapper>
          <S.UnderlinedText to='/signup'>
            아직 회원이 아니시라면?
          </S.UnderlinedText>
        </S.FormWrapper>
      </S.Wrapper>
    </main>
  );
}
