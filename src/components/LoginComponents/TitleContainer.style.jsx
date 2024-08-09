import { Link } from 'react-router-dom';

import { Icon } from '../Icon';

import styled from 'styled-components';


// back 아이콘과 TitleText, Spacer를 묶는 컨테이너
export const TitleContainer = styled.div` 
  width: 100%;
  gap: 0 120px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

// 제목 텍스트
export const TitleText = styled.span`
  font-weight: 600;
  font-size: 25px;
  align: center;
`;

// TitleContainer 정렬을 위한 스페이서
export const Spacer = styled.div`
  width: 35px;
  height: 35px;
  flex: 0 0 auto;
`;