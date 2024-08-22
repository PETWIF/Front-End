import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { debounce } from 'lodash';

import { mockPostSignup, mockPostCheckEmail } from '../../dummy/data/user.js';

import { Button } from '../../components/Button';

import useLoginModal from '../../hooks/useLoginModal.jsx';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './SignUpPage.style.jsx';

// 추후 유효성 검사 통과 여부에 따라 글씨 바뀌도록 설정 필요
export default function SignUpPage() {
  const { isOpen, open, close, LoginModal } = useLoginModal();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdRe, setPwdRe] = useState('');

  const [isRightName, setIsRightName] = useState(false);
  const [isRightEmail, setIsRightEmail] = useState(false);
  const [isRightCode, setIsRightCode] = useState(false);
  const [isRightPwd, setIsRightPwd] = useState(false);
  const [isRightPwdRe, setIsRightPwdRe] = useState(false);

  const validateName = (value) => value.trim().length >= 2 && value.trim().length <= 6;
  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validateCode = (value) => /^[0-9]{6}$/.test(value); // 일단 숫자 n자리로 상정
  const validatePassword = (value) =>
    value.length >= 4 &&
    value.length <= 12 &&
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])./.test(value);
  const validatePasswordRe = (value) => value === pwd;

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdReError, setPwdReError] = useState('');

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
    setTimeLeft(300); // 5분(300초)
    setIsTimerActive(true);
  };

  const debouncedValidateName = useCallback(
    debounce((value) => {
      const isValid = validateName(value);
      setIsRightName(isValid);
      setNameError(isValid ? '올바른 양식입니다!' : '이름은 2자 이상부터 6자 이하까지 입력 가능합니다');
    }, 200),
    [validateName]
  );

  const debouncedValidateEmail = useCallback(
    debounce((value) => {
      const isValidEmail = validateEmail(value);
      setIsRightEmail(isValidEmail);
      setEmailError(isValidEmail ? '올바른 양식입니다!' : '올바른 양식이 아닙니다.');
    }, 200),
    []
  );

  const debouncedValidateCode = useCallback(
    debounce((value) => {
      setCode(value);
      const isValidCode = validateCode(value);
      setIsRightCode(isValidCode);
    }, 200),
    []
  );

  const debouncedValidatePassword = useCallback(
    debounce((value) => {
      const isValid = validatePassword(value);
      setIsRightPwd(isValid);
      setPwdError(isValid ? '올바른 양식입니다!' : '영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해 주세요');
    }, 200),
    [validatePassword]
  );

  const debouncedValidatePasswordRe = useCallback(
    debounce((value) => {
      const isValid = validatePasswordRe(value);
      setIsRightPwdRe(isValid);
      setPwdReError(isValid ? '비밀번호가 일치합니다!' : '비밀번호가 일치하지 않습니다');
    }, 200),
    [validatePasswordRe]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { id, value } = e.target;

      switch (id) {
        case 'name':
          setName(value);
          debouncedValidateName(value);
          break;
        case 'e-mail':
          setEmail(value);
          debouncedValidateEmail(value);
          break;
        case 'code':
          setCode(value);
          debouncedValidateCode(value);
          break;
        case 'pwd':
          setPwd(value);
          debouncedValidatePassword(value);
          break;
        case 'pwdRe':
          setPwdRe(value);
          debouncedValidatePasswordRe(value);
          break;
        default:
          break;
      }
    },
    [
      debouncedValidateName,
      debouncedValidateEmail,
      debouncedValidateCode,
      debouncedValidatePassword,
      debouncedValidatePasswordRe,
    ]
  );

  const handleEmailSubmit = async () => {
    try {
      await mockPostCheckEmail({ email });
      console.log('가입 가능한 이메일:', { email });
    } catch (error) {
      console.error('오류 발생:', error.message);
      if (error.message === 'User already exists') {
        setIsRightEmail(false);
        setEmailError('이미 가입된 이메일입니다.');
      }
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (!isRightCode) {
      setCodeError('인증번호가 일치하지 않습니다.');
    } else {
      setCodeError('인증번호가 일치합니다!');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const navigate = useNavigate();
  const formData = { name: name, email: email, password: pwd, passwordCheck: pwdRe };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(isRightEmail && isRightPwd && isRightPwdRe)) return;

    try {
      console.log('Form data submitted:', formData);
      await mockPostSignup(formData);
      navigate('/agree', { state: { email, password: pwd } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
            <TitleContainer backIcon='true' titleText='회원 가입' />
            <S.FormContainer onSubmit={handleSubmit}>
              <S.InputWrapper>
                <S.MainBoldText>이름</S.MainBoldText>
                <S.InputContainer>
                  <S.InputStyle
                    id='name'
                    type='text'
                    className='name'
                    placeholder='이름을 입력해 주세요'
                    onChange={handleInputChange}
                  />
                </S.InputContainer>
                <S.WarningText className={isRightName ? 'success' : 'error'}>
                  {nameError}
                </S.WarningText>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.MainBoldText>이메일</S.MainBoldText>
                <S.InputContainer>
                  <S.InputStyle
                    id='e-mail'
                    type='text'
                    className='email'
                    placeholder='이메일을 입력해 주세요'
                    onChange={handleInputChange}
                  />
                  <Button
                    width='150px'
                    padding='11px'
                    fontSize='15px'
                    buttonStyle='light'
                    onClick={(e) => {
                      e.preventDefault();
                      //handleSendCode(); 
                      handleEmailSubmit();
                      setEmailError('인증번호가 전송되었습니다.');
                    }}
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
                    width='150px'
                    padding='11px'
                    fontSize='15px'
                    buttonStyle='light'
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
              <S.InputWrapper>
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
              </S.InputWrapper>
              <S.InputWrapper>
                <S.MainBoldText>비밀번호 확인</S.MainBoldText>
                <S.InputStyle
                  id='pwdRe'
                  type='password'
                  className='pwdRe'
                  placeholder='위의 비밀번호를 다시 입력해 주세요'
                  onChange={handleInputChange}
                />
                <S.WarningText className={isRightPwdRe ? 'success' : 'error'}>
                  {pwdReError}
                </S.WarningText>
              </S.InputWrapper>
              <br />
              <Button
                type='submit'
                width='100%'
                padding='15px'
                buttonStyle='orange'
                disabled={!isRightName || !isRightEmail || !isRightPwd || !isRightPwdRe}
              >
                가입 완료
              </Button>
            </S.FormContainer>
          </S.FormWrapper>
          <Button
            width='100%'
            padding='20px'
            borderRadius='0'
            buttonStyle='light'
            hasBorder='true'
            onClick={open}
          >
            계정이 있으신가요? 로그인
          </Button>
        </S.Container>
      </S.Wrapper>
      {isOpen && <LoginModal type='warning' close={close} />}
    </main>
  );
}
