import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';

import useLoginModal from '../../hooks/useLoginModal.jsx';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './SignUpPage.style.jsx';

// 추후 유효성 검사 통과 여부에 따라 글씨 바뀌도록 설정 필요
export default function SignUpPage() {
    const { isOpen, open, close, LoginModal } = useLoginModal();

    const handleSubmit = (event) => {
        event.preventDefault(); 
        // 여기에 코드 추가
    };

    return (
        <main>
            <LoginHeader />
            <S.Wrapper>
                <S.Container>
                    <S.FormWrapper>
                        <TitleContainer
                            backIcon='true'
                            titleText='회원 가입'
                        />
                        <S.FormContainer onSubmit={handleSubmit}>
                            <S.InputWrapper>
                                <S.InputContainer>
                                    <S.MainBoldText>이름</S.MainBoldText>
                                    <S.InputStyle 
                                        type='text'
                                        className='name' 
                                        placeholder='이름을 입력해 주세요'
                                    />
                                </S.InputContainer>
                            </S.InputWrapper>
                            <S.InputWrapper>
                                <S.InputContainer>
                                    <S.MainBoldText>이메일</S.MainBoldText>
                                    <S.InputStyle 
                                        type='text'
                                        className='email' 
                                        placeholder='이메일을 입력해 주세요'
                                    />
                                </S.InputContainer>
                                <Button
                                    width='150px'
                                    padding='15px'
                                    buttonStyle='gray'
                                >
                                    인증번호 전송
                                </Button>
                            </S.InputWrapper>
                            <S.InputWrapper>
                                <S.InputContainer>
                                    <S.MainBoldText>인증번호 입력</S.MainBoldText>
                                    <S.InputStyle 
                                        type='text'
                                        className='certification' 
                                        placeholder='인증번호를 입력해 주세요'
                                    />
                                </S.InputContainer>
                                <Button
                                    width='150px'
                                    padding='15px'
                                    buttonStyle='gray'
                                >
                                    인증번호 확인
                                </Button>
                            </S.InputWrapper>
                            <S.InputWrapper>
                                <S.InputContainer>
                                    <S.MainBoldText>비밀번호</S.MainBoldText>
                                    <S.InputStyle 
                                        type='text'
                                        className='pwd' 
                                        placeholder='비밀번호를 입력해 주세요'
                                    />
                                </S.InputContainer>
                            </S.InputWrapper>
                            <S.InputWrapper>
                                <S.InputContainer>
                                    <S.MainBoldText>비밀번호 확인</S.MainBoldText>
                                    <S.InputStyle 
                                        type='text'
                                        className='pwd-re' 
                                        placeholder='위의 비밀번호를 다시 입력해 주세요'
                                    />
                                </S.InputContainer>
                            </S.InputWrapper>
                            <br />
                            <Link to='/agree'>
                                <Button
                                    width='100%'
                                    padding='15px'
                                    buttonStyle='gray'
                                >
                                    가입 완료
                                </Button>
                            </Link>
                        </S.FormContainer>
                    </S.FormWrapper>
                        <Button
                            width='537px'
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
            {isOpen && <LoginModal 
                type='warning'
                close={close} 
            />}            
        </main>
    );
}
