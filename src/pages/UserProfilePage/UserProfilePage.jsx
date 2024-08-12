import { Button } from '../../components/Button';
import {
  Checkbox,
  Dropdown,
  Radio,
  RadioGroup,
  TextInput,
} from '../../components/Input';
import { Flex } from '../../components/Common';
import { Profile } from '../../components/Profile';
import { RandomFriend } from '../../components/RandomFriend';

import { AGE_LIST, TELECOM_LIST } from '../../constants';

import * as S from './UserProfilePage.style.jsx';

const userId = 1;

export default function UserProfilePage() {
  return (
    <S.UserProfileLayout>
      <S.MainWrapper>
        <S.MainContainer>
          <S.Fieldset>
            <S.Title>회원정보</S.Title>
            <S.Field>
              <S.Label>성별</S.Label>
              <RadioGroup name='gender' defaultValue='male' callback={() => {}}>
                <Radio value='male' defaultChecked>
                  남성
                </Radio>
                <Radio value='female'>여성</Radio>
              </RadioGroup>
            </S.Field>
            <S.Field>
              <S.Label>생년월일</S.Label>
              <Flex $gap='17px'>
                <TextInput type='text' placeholder='년도' />
                <TextInput type='text' placeholder='월' />
                <TextInput type='text' placeholder='일' />
              </Flex>
            </S.Field>
            <S.Field>
              <S.Label>전화번호</S.Label>
              <Flex $gap='17px'>
                <Dropdown
                  width='96px'
                  options={TELECOM_LIST}
                  placeholder='통신사'
                  callback={(data) => {}}
                />
                <TextInput type='text' placeholder='전화번호를 입력해주세요' />
              </Flex>
            </S.Field>
            <S.Field>
              <S.Label>거주지</S.Label>
              <Flex $gap='17px'>
                <TextInput type='text' placeholder='거주지를 입력해주세요' />
                <Button width='120px' padding='11px'>
                  주소 검색
                </Button>
              </Flex>
            </S.Field>
          </S.Fieldset>
          <S.Fieldset>
            <S.Title>반려동물 정보</S.Title>
            <S.Field>
              <S.Label>이름</S.Label>
              <TextInput
                type='text'
                placeholder='반려동물의 이름을 입력해주세요'
              />
            </S.Field>
            <S.Field>
              <S.Label>성별</S.Label>
              <RadioGroup name='gender' defaultValue='male' callback={() => {}}>
                <Radio value='male' defaultChecked>
                  수컷
                </Radio>
                <Radio value='female'>암컷</Radio>
              </RadioGroup>
            </S.Field>
            <S.Field>
              <S.Label>나이</S.Label>
              <Dropdown
                width='96px'
                options={AGE_LIST}
                placeholder='0세'
                callback={(data) => {}}
              />
            </S.Field>
          </S.Fieldset>
          <Button padding='20px'>저장하기</Button>
        </S.MainContainer>
      </S.MainWrapper>
      <S.SideContainer>
        <Profile userId={userId} />
        <RandomFriend />
      </S.SideContainer>
    </S.UserProfileLayout>
  );
}
