import styled from 'styled-components';

import { Layout } from '../../components/Common';

export const SettingLayout = styled.main`
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
`;

export const MenuBox = styled(Layout)`
  width: 365px;
  height: 86vh;
  padding: 53px 23px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const Content = styled.div`
  flex: 1;
`;
