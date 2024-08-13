import styled from 'styled-components';

import { Layout } from '../../../components/Common';

export const SettingLayout = styled(Layout)`
  height: 86vh;
  padding: 49px 52px;
`;

export const Content = styled.div`
  width: 75%;
`;

export const Title = styled.h2`
  padding-bottom: 8px;
  border-bottom: 1px solid #dfdfdf;
  font-weight: 500;
  font-size: 23px;
  line-height: 33px;
  display: flex;
  align-items: center;
`;

export const Fieldset = styled.div`
  margin-bottom: 38px;
`;

export const Field = styled.div`
  margin: 16px 0;
`;

export const Label = styled.div`
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  color: #1e1e1e;
`;

export const Text = styled.p`
  margin: 11px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
`;

export const SearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const FriendList = styled.ul`
  width: 50%;
  margin: 23px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FriendItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: ${(props) => props.theme.color.black};

  & > div {
    display: flex;
    align-items: center;
    gap: 13px;
  }
`;
