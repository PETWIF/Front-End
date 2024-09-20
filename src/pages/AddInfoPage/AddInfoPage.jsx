import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { patchAddUserInfo, postAddPetInfo, patchAddUserInfoBeforeLogin, postAddPetInfoBeforeLogin } from '../../apis/addInfo.js';

import { Button } from '../../components/Button';

import LoginHeader from '../../components/LoginComponents/LoginHeader';
import TitleContainer from '../../components/LoginComponents/TitleContainer';

import * as S from './AddInfoPage.style.jsx';


export default function AddInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { email } = location.state || {};

  const [gender, setGender] = useState('');
  const [year, setYear] = useState(''); 
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [telecom, setTelecom] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [petName, setPetName] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petKind, setPetKind] = useState('');

  const birthDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ gender, birthDate, telecom, phone, address });
    console.log({ petName, petGender, petAge, petKind });

    try {
      const token = localStorage.getItem('accessToken');
      let userRes, petRes;

        if (token) {
          [userRes, petRes] = await Promise.all([
            patchAddUserInfo({ gender, birthDate, telecom, phone, address }),
            postAddPetInfo({ petName, petGender, petAge, petKind })
          ]);
        } else {
          [userRes, petRes] = await Promise.all([
            patchAddUserInfoBeforeLogin({ email, gender, birthDate, telecom, phone, address }),
            postAddPetInfoBeforeLogin({ email, petName, petGender, petAge, petKind })
          ]);
        }

        console.log(petRes, userRes);
        const { isSuccess } = petRes;

      if (isSuccess) {
      console.log('정보 입력 성공');
      navigate('/registered', { state: { email: email } });
      } else {
        console.error('펫:', petRes);
      }
    } catch (error) {
      console.error('정보 입력 중 에러 발생:', error);
    }
  };

  return (
    <main>
      <LoginHeader />
      <S.Wrapper>
        <S.Container>
          <S.FormWrapper>
            <TitleContainer
              to='setNickname'
              backIcon='true'
              titleText='추가 정보 입력'
            />
            <S.FormContainer>
              <S.MainBoldText>회원 정보</S.MainBoldText>
              <S.StyledHr />
              <S.MainBoldText>성별</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='gender'
                  value='MALE'
                  onChange={(e) => setGender(e.target.value)}
                />
                <S.MainNormalText>남성</S.MainNormalText>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='gender'
                  value='FEMALE'
                  onChange={(e) => setGender(e.target.value)}
                />
                <S.MainNormalText>여성</S.MainNormalText>
              </S.InputWrapper>
              <S.MainBoldText>생년월일</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='92px'
                  type='text'
                  className='year'
                  placeholder='연도(YYYY)'
                  onChange={(e) => setYear(e.target.value)}
                />
                <S.InputStyle
                  $width='92px'
                  type='text'
                  className='month'
                  placeholder='월(MM)'
                  onChange={(e) => setMonth(e.target.value)}
                />
                <S.InputStyle
                  $width='92px'
                  type='text'
                  className='day'
                  placeholder='일(DD)'
                  onChange={(e) => setDay(e.target.value)}
                />
              </S.InputWrapper>
              <S.MainBoldText>전화번호</S.MainBoldText>
              <S.InputWrapper>
                <S.SelectStyle 
                  $width='92px' 
                  className='telecom'
                  onChange={(e) => setTelecom(e.target.value)}
                  >
                  <option value=''>통신사 선택</option>
                  <option value='SKT'>SKT</option>
                  <option value='KT'>KT</option>
                  <option value='LGUPLUS'>LG U+</option>
                  <option value='ETC'>기타</option>
                </S.SelectStyle>
                <S.InputStyle
                  type='text'
                  className='phone'
                  placeholder='전화번호를 입력해 주세요'
                  onChange={(e) => setPhone(e.target.value)}
                />
              </S.InputWrapper>
              <S.MainBoldText>거주지</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='316px'
                  type='text'
                  className='address'
                  placeholder='거주지를 입력해 주세요 (예: 서울시 용산구)'
                  onChange={(e) => setAddress(e.target.value)}
                />
                {/* <Button type='button' width='119px' fontSize='14px' padding='14px' buttonStyle='light'>
                  주소 입력
                </Button> */}
              </S.InputWrapper>
              <br />
              <S.MainBoldText>반려동물 정보</S.MainBoldText>
              <S.StyledHr />
              <S.InputWrapper>
                <S.InputContainer>
                  <S.MainBoldText>이름</S.MainBoldText>
                  <S.InputStyle
                    $width='263px'
                    type='text'
                    placeholder='반려동물의 이름을 입력해 주세요'
                    onChange={(e) => setPetName(e.target.value)}
                  />
                </S.InputContainer>
              </S.InputWrapper>
              <S.MainBoldText>성별</S.MainBoldText>
              <S.InputWrapper>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='pet-gender'
                  value='MALE'
                  onChange={(e) => setPetGender(e.target.value)}
                />
                <S.MainNormalText>수컷</S.MainNormalText>
                <S.InputStyle
                  $width='20px'
                  type='radio'
                  name='pet-gender'
                  value='FEMALE'
                  onChange={(e) => setPetGender(e.target.value)}
                />
                <S.MainNormalText>암컷</S.MainNormalText>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.InputContainer>
                  <S.MainBoldText>나이</S.MainBoldText>
                  <S.InputStyle
                    $width='263px'
                    type='text'
                    placeholder='반려동물의 나이를 입력해 주세요'
                    onChange={(e) => setPetAge(e.target.value)}
                  />
                </S.InputContainer>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.InputContainer>
                  <S.MainBoldText>종류</S.MainBoldText>
                  <S.InputStyle
                    $width='263px'
                    type='text'
                    placeholder='반려동물의 종류를 입력해 주세요'
                    onChange={(e) => setPetKind(e.target.value)}
                  />
                </S.InputContainer>
              </S.InputWrapper>
                <Button 
                    onClick={(e) => handleSubmit(e)} 
                    width='100%' 
                    padding='15px' 
                    buttonStyle='orange'>
                  입력 완료
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
