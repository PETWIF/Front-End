import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockPostSignup } from '../../dummy/data/user.js';

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
  const validateCode = (value) => /^[0-9]{6}$/.test(value) // 일단 숫자 n자리로 상정
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'name':
        setName(value);
        const isValidName = validateName(value);
        setIsRightName(isValidName);
        setNameError(
          isValidName ? '올바른 양식입니다!' : '이름은 2자 이상부터 6자 이하까지 입력 가능합니다'
        );
        break;
      case 'e-mail':
        setEmail(value);
        const isValidEmail = validateEmail(value);
        setIsRightEmail(isValidEmail);
        setEmailError(
          isValidEmail ? '올바른 양식입니다!' : '올바른 양식이 아닙니다'
        );
        break;
      case 'code':
          console.log({ code });
          setCode(value);
          break;
      case 'pwd':
        setPwd(value);
        setIsRightPwd(validatePassword(value));
        setIsRightPwdRe(validatePasswordRe(pwdRe));
        const isValidPwd = validatePassword(value);
        setIsRightPwd(isValidPwd);
        if (value.length < 4 || value.length > 12) {
          if (value.length < 4) {
            setPwdError('비밀번호를 4자리 이상 입력해 주세요');
            break;
          } else if (value.length > 12) {
            setPwdError('비밀번호는 12자리까지 입력 가능합니다');
            break;
          }
        }
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/.test(value)) {
          setPwdError(
            '영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해 주세요'
          );
          break;
        } else setPwdError('올바른 양식입니다!');
        break;
      case 'pwdRe':
        setPwdRe(value);
        const isValidPwdRe = validatePasswordRe(value);
        setIsRightPwdRe(isValidPwdRe);
        setPwdReError(
          isValidPwdRe
            ? '비밀번호가 일치합니다!'
            : '비밀번호가 일치하지 않습니다'
        );
        break;
      default:
        break;
    }
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
      if (error.message === 'User already exists') {
        setEmailError('이미 가입된 이메일입니다.');
        setIsRightEmail(false);
      }
    }
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
                  // handleSendCode 
                  setEmailError('인증번호가 전송되었습니다.');
                  handleSubmit
                }}
                disabled={!isRightEmail}>
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
