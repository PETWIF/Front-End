import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './PwdSearchPage.style.jsx';

// 추후 유효성 검사 통과 여부에 따라 경고 텍스트 글씨 바뀌도록 설정 필요
export default function PwdSearchPage() {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        let timer;
        if (isTimerActive) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => {
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

    const handleSubmit = (event) => {
        event.preventDefault(); 
        // 여기에 인증번호 확인 코드 추가
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
                        <TitleContainer
                            backIcon='true'
                            titleText='비밀번호 찾기'
                        />
                        <S.FormContainer onSubmit={handleSubmit}>
                            <S.InputWrapper>
                                <S.InputContainer>
                                    <S.MainBoldText>이메일</S.MainBoldText>
                                    <S.InputStyle
                                        type='text'
                                        className='email' 
                                        placeholder='이메일을 입력해 주세요'
                                    />
                                    {/* 나중에 텍스트 바뀌도록 할 것 */}
                                    <S.WarningText>* 올바른 이메일인지 확인해 주세요.</S.WarningText>
                                </S.InputContainer>
                                <Button
                                    width='150px'
                                    padding='15px'
                                    buttonStyle='gray'
                                    onClick={handleSendCode}
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
                                    <S.WarningText>* 인증번호가 잘못되었어요.</S.WarningText>
                                </S.InputContainer>
                                <Button
                                    width='150px'
                                    padding='15px'
                                    buttonStyle='gray'
                                >
                                    인증번호 확인
                                </Button>
                            </S.InputWrapper>
                            {isTimerActive && (
                                <S.TimerDisplay>
                                    {formatTime(timeLeft)}
                                </S.TimerDisplay>
                            )}
                            <Link to='/changePwd'>
                                <Button
                                    width='447px'
                                    padding='15px'
                                    buttonStyle='gray'
                                >
                                    인증 완료
                                </Button>
                            </Link>
                        </S.FormContainer>
                        <S.UnderlinedText to={'/changePwd'}>
                            비밀번호를 재설정할 수 없나요?
                        </S.UnderlinedText>
                        <S.StyledHr />
                        <S.UnderlinedText to={'/signup'}>
                            새 계정 만들기
                        </S.UnderlinedText>
                    </S.FormWrapper>
                    <Link to='/login'>
                        <Button
                            width='537px'
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
