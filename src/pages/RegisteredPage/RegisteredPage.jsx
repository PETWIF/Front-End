import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';

import { getMyProfile } from '../../apis/getMyProfile.js'; 

import { Profile as Img } from '../../dummy/images';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './RegisteredPage.style.jsx';

export default function RegisteredPage() {
  const [redirectToHome, setRedirectToHome] = useState(false); 
  const [profile, setProfile] = useState(Img);
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();

  const getProfilePic = async () => {
    const response = await getMyProfile();
    const { isSuccess, data } = response;

    console.log(response);

    if (isSuccess) {
      const { nickname, profile_url } = data;
      setNickname(nickname);
      setProfile(profile_url);
    } else {
      console.log("프로필 사진 미설정 상태. 기본 프로필 사진으로 대체됩니다.");
    }
};

  useEffect(() => {
    getProfilePic();

    if (redirectToHome) {
      navigate('/login');
    }
  }, [redirectToHome, navigate]); 

  const handleButtonClick = () => {
    setRedirectToHome(true); 
  };

  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
        <TitleContainer titleText='회원가입 완료' />
          <S.FormWrapper>
            <S.InputFileStyle>
              <Avatar src={profile} size='212px' />
            </S.InputFileStyle>
            <S.MainBoldText>{nickname} 님</S.MainBoldText>
            <S.StyledHr />
            <S.Welcome>
              <S.MainNormalText>
                새로운 회원이 되신 것을 환영해요!
                </S.MainNormalText>
              <S.MainNormalText>
                펫위프와 함께 추억을 저장하러 가 볼까요?
              </S.MainNormalText>
              <br />
            </S.Welcome>
            <Button width='100%' padding='16px' buttonStyle='orange' onClick={handleButtonClick}>
              로그인 페이지로 가기
            </Button>
          </S.FormWrapper>
        </S.Container>
      </S.Wrapper>
    </main>
  );
}
