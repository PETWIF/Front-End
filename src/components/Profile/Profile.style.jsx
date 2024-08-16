import styled from 'styled-components';

import { Layout } from '../Common';

export const ProfileLayout = styled(Layout)`
  padding: 25px;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    flex: 2;
    display: flex;
    align-items: center;
    gap: 21px;
  }

  & > button {
    flex: 1;
  }
`;

export const NicknameContianer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  & > span {
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
  }
`;

export const Description = styled.p`
  margin: 16px 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
`;

export const ProfileInfoList = styled.ul`
  display: flex;
  justify-content: space-around;
`;

export const ProfileInfoItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    font-weight: 500;
    font-size: 25px;
    line-height: 36px;
  }

  & > span:last-child {
    font-size: 16px;
    line-height: 23px;
  }
`;
