import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Flex } from '../../components/Common';

export const Header = styled(Flex)`
  height: 80px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray3};
`;

// 페이지 전체
export const Wrapper = styled(Flex)`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.white};
  padding: 80px 150px;
  gap: 150px;
`;

export const Container = styled.div`
  width: 450px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color.white};
`;

// input label과 같이 올라가는 두꺼운 텍스트
export const MainBoldText = styled.p`
  font-weight: 600;
  font-size: 17px;
  align: center;
`;

// MainBoldText 아래의 작은 텍스트
export const MainNormalText = styled.p`
  font-size: 15px;
  align: center;
  color: ${(props) => props.theme.color.gray2};
`;

// 링크, 누르면 넘어가는 밑줄 친 텍스트
export const UnderlinedText = styled(Link)`
  font-size: 15px;
  font-weight: 500;
  text-decoration-line: underline;
  color: ${(props) => props.theme.color.gray2};
`;

export const WarningText = styled.span`
  &.error {
    color: red;
  }
  &.success {
    color: #f87f28;
  }

  font-size: 14px;
  font-weight: 400;
  margin-top: 5px;
`;

export const StyledHr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray2};
  margin: 20px;
`;

// 로그인으로 돌아가기 버튼을 제외한 폼 전체 박스
// border 컬러 props로 교체
export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #b4b4b4;
  padding: 37.5px;
  display: flex;
  flex-direction: column;
`;

// 이메일 입력 ~ 인증 완료 버튼까지의 부분
export const FormContainer = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  scrollbar-color: transparent transparent;

  -ms-overflow-style: none;
`;

// MainBoldText, (MainBoldText,) InputStyle, Button을 묶는 컨테이너
// 경고 텍스트 때문에 이 페이지의 align-items만 center로 다름 (다른 덴 flex-end)
export const InputWrapper = styled.div`
  width: 100%;
  margin: 5px 0 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

// MainBoldText, (MainBoldText,) InputStyle을 묶는 컨테이너
export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: flex-start;
  flex-direction: flex-inline;
`;

export const InputStyle = styled.input`
  width: 100%;
  height: 56px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  color: ${(props) => props.theme.color.gray1};
  background: ${(props) => props.theme.color.gray5};
`;

export const TimerDisplay = styled.div`
  font-size: 20px;
  margin: 0 0 10px 0;
  align-self: center;
  color: ${(props) => props.theme.color.primary};
`;
