import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './PwdSearchPage.style.jsx';
import { mockPostPwdSearch } from '../../dummy/data/user.js';

// 추후 유효성 검사 통과 여부에 따라 경고 텍스트 글씨 바뀌도록 설정 필요
export default function PwdSearchPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');

  const [isRightEmail, setIsRightEmail] = useState(false);
  const [isRightCode, setIsRightCode] = useState(false);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validateCode = (value) => /^[0-9]{6}$/.test(value) // 일단 숫자 n자리로 상정

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer;
    if (isTimerActive) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setIsTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive]);

  const handleSendCode = () => {
    setTimeLeft(300); // 5 minutes in seconds
    setIsTimerActive(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'email':
        console.log({ email });
        setEmail(value);
        const isValidEmail = validateEmail(value);
        setIsRightEmail(isValidEmail);
        setEmailError(
          isValidEmail ? '올바른 양식입니다!' : '올바른 양식이 아닙니다.'
        );
        break;
      case 'code':
        console.log({ code });
        setCode(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!isRightEmail) {
           return;
    }

    try {
      await mockPostPwdSearch({ email });
      console.log('이메일 존재:', { email });
    } catch (error) {
      console.log({ email });
      console.error('이메일 존재하지 않음:', error.message);
      if (error.message === 'User not found') {
        console.log('이메일 미존재:', { email });
        setEmailError('가입되지 않은 이메일입니다.');
      } 
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    navigate('/changePwd');
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();

    // if (!isRightCode) {
    //   return;
    // } -> 해당 코드가 이메일에서는 잘 작동하는데, 코드는 disabled의 length 제한과 onChange 적용 시점 등이 얽혀서 제대로 작동하지 않음
        
    const isValidCode = validateCode(code);
    setIsRightCode(isValidCode);
    setCodeError(
      isRightCode ? '인증번호가 일치합니다!' : '인증번호가 일치하지 않습니다.'
    );
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
            <TitleContainer backIcon='true' titleText='비밀번호 찾기' />
            <S.FormContainer onSubmit={handleSubmit}>
              <S.InputWrapper>
                <S.MainBoldText>이메일</S.MainBoldText>
                <S.InputContainer>
                  <S.InputStyle
                    type='text'
                    id='email'
                    className='email'
                    placeholder='이메일을 입력해 주세요'
                    onChange={handleInputChange}
                  />
                <Button
                  type='button'
                  width='150px'
                  buttonStyle='light'
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendCode;
                    setEmailError('인증번호가 전송되었습니다.');
                    handleEmailSubmit(e);
                  }}
                  fontSize='14px'
                  disabled={!isRightEmail}
                >
                  인증번호 전송
                </Button>
                </S.InputContainer>
                <S.WarningText className={isRightEmail ? 'success' : 'error'}>
                  {emailError}
                </S.WarningText>
              </S.InputWrapper>
              <S.InputWrapper>
              <S.MainBoldText>인증번호 입력</S.MainBoldText>
                <S.InputContainer>
                  <S.InputStyle
                    type='text'
                    id='code'
                    className='code'
                    placeholder='인증번호를 입력해 주세요'
                    onChange={handleInputChange}
                  />
                <Button 
                  id='code'
                  width='150px' 
                  buttonStyle='light'
                  fontSize='14px'
                  disabled={code.length !== 6}
                  onClick={handleCodeSubmit}
                  >
                  인증번호 확인
                </Button>
                </S.InputContainer>
                <S.WarningText className={isRightCode ? 'success' : 'error'}>
                {codeError}
                    </S.WarningText>
              </S.InputWrapper>
              {isTimerActive && (
                <S.TimerDisplay>{formatTime(timeLeft)}</S.TimerDisplay>
              )}
                <Button 
                  type='submit'
                  width='100%' 
                  padding='15px' 
                  buttonStyle='orange'
                  disabled={!isRightCode || !isRightEmail}
                  >
                  인증 완료
                </Button>
            <S.UnderlinedText 
              //to={'/changePwd'}
              >
                <br />
              비밀번호를 재설정할 수 없나요?
            </S.UnderlinedText>
            <S.StyledHr />
            <S.UnderlinedText to={'/signup'}>새 계정 만들기</S.UnderlinedText>
            </S.FormContainer>
          </S.FormWrapper>
          <Link to='/login'>
            <Button
              width='450px'
              padding='20px'
              borderRadius='0'
              hasBorder='true'
              buttonStyle='light'
            >
              로그인 화면으로 돌아가기
            </Button>
          </Link>
        </S.Container>
      </S.Wrapper>
    </main>
  );
}
