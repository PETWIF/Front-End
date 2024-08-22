import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { patchNickname, postProfilePic } from '../../apis/nickname.js';

import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './SetNicknamePage.style.jsx';

export default function SetNicknamePage() {
  const Img = <Icon id='editPic' width='212px' height='212px'></Icon>

  const [nickname, setNickname] = useState('');
  const [isRightNickname, setIsRightNickname] = useState(false);
  const [nicknameError, setNicknameError] = useState('');

  const [profilePic, setProfilePic] = useState(null); 
  const [preview, setPreview] = useState(Img);

  const validateNickname = (value) => value.trim().length >= 2 && value.trim().length <= 6;

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

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfilePic(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result); // 파일을 읽어 미리보기 이미지 설정
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async (e, destination) => {
      e.preventDefault();
  
      if (!isRightNickname) return;

      try {
        const response = await patchNickname({ nickname });
        const { isSuccess } = response;
  
        if (isSuccess) {
          console.log('사용 가능한 닉네임:', { nickname });
          setNicknameError('사용 가능한 닉네임입니다!');

          if (profilePic) 
            await postProfilePic(profilePic); 
          else 
            await postProfilePic(editPic);

          navigate(destination, { state: { email, password, nickname: nickname } });
        } else {
          setIsRightNickname(false); 
          setNicknameError('이미 사용 중인 닉네임입니다.');
        }
      } catch (error) {
        console.error('이메일 전송 실패:', error);
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
            // <Icon id='editPic' width='212px' height='212px' />
            <S.InputFileStyle type="file" accept="image/*" onChange={handleFileChange} />
            <S.InputContainer>
              <S.MainBoldText>닉네임</S.MainBoldText>
              <S.MainNormalText>
                닉네임은 영어, 숫자, 특수문자로 이루어진 2~6자로 만들 수 있어요
              </S.MainNormalText>
              <S.InputStyle id='nickname' placeholder='닉네임을 입력해 주세요(특수문자는 _만 가능)' onChange={(e) => {handleInputChange(e)}}/>
              <S.WarningText className={isRightNickname ? 'success' : 'error'}>
                  {nicknameError}
                </S.WarningText>
              </S.InputContainer>
              <br />
              <S.MainBoldText>추가 정보 입력</S.MainBoldText>
              <S.StyledHr />
              <Button width='100%' padding='16px' buttonStyle='orange' onClick={() => navigate('/addInfo', { state: { email, password, nickname: nickname }})}>
                지금 입력
              </Button>
              <Button width='100%' padding='16px' buttonStyle='gray' onClick={(e) => navigate('/home', { state: { email, password, nickname: nickname }})}>
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
