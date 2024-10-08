import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { searchPwd, postCode } from '../../apis/certificationCode.js';

import { debounce } from 'lodash';

import { Button } from '../../components/Button';
import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './PwdSearchPage.style.jsx';

export default function PwdSearchPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isRightEmail, setIsRightEmail] = useState(false);
  const [isRightCode, setIsRightCode] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validateCode = (value) => /^[0-9]{6}$/.test(value); // 6자리 숫자

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
    setTimeLeft(300); 
    setIsTimerActive(true);
  };

  const debouncedValidateEmail = useCallback(
    debounce((value) => {
      const isValidEmail = validateEmail(value);
      setIsRightEmail(isValidEmail);
      setEmailError(isValidEmail ? '올바른 양식입니다!' : '올바른 양식이 아닙니다.');
    }, 300),
    []
  );

  const debouncedValidateCode = useCallback(
    debounce((value) => {
      setCode(value);
      const isValidCode = validateCode(value);
      setIsRightCode(isValidCode);
    }, 50),
    []
  );

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'email':
        setEmail(value);
        debouncedValidateEmail(value); 
        break;
      case 'code':
        setCode(value);
        debouncedValidateCode(value);
        break;
      default:
        break;
    }
  }, [debouncedValidateEmail, debouncedValidateCode]);

  const handleEmailSubmit = async () => {
    if (!isRightEmail) {
      return;
    }

    try {
      const response = await searchPwd({ email });
      const { isSuccess } = response;

      if (isSuccess) {
        console.log('이메일 존재:', { email });
        setEmailError('인증번호가 전송되었습니다.');
      } else {
        setIsRightEmail(false); 
        setEmailError('가입되지 않은 이메일입니다. 다시 한 번 확인해 주세요.');
      }
    } catch (error) {
      console.error('이메일 전송 실패:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/changePwd', { state: { email: email }});
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postCode({ email, code });
      const { isSuccess, message } = response;

      if (isSuccess) {
        console.log('인증 성공:', code);
        setCodeError('인증번호가 일치합니다!');
        console.log(message);
      } else {
        setIsRightCode(false);
        setCodeError('인증번호가 일치하지 않습니다.');
        console.log(message);
      }
    } catch (error) {
      console.error('인증번호 확인 실패:', error);
      console.log(message);
    }
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
                      handleSendCode(); 
                      handleEmailSubmit();
                    }}
                    fontSize='14px'
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
                    onClick={handleCodeSubmit}
                  >
                    인증번호 확인
                  </Button>
                </S.InputContainer>
                <S.WarningText className={isRightCode ? 'success' : 'error'}>
                  {codeError}
                </S.WarningText>
              </S.InputWrapper>
              {isRightEmail && isTimerActive && (
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
              <S.UnderlinedText>
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