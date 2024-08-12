import styled from 'styled-components';

import { Layout } from '../../components/Common';

export const UserProfileLayout = styled.main`
  padding: 0 30px;
  margin-bottom: 100px;
  display: flex;
  gap: 30px;
`;

// main

export const MainWrapper = styled(Layout)`
  min-width: 700px;
  flex: 1;
  padding: 33px 0 100px 33px;
  overflow: hidden;
`;

export const MainContainer = styled(Layout)`
  width: 75%;
`;

export const Fieldset = styled.div`
  margin-bottom: 38px;
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

// side
export const SideContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
