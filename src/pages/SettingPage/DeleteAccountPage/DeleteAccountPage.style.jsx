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

export const Text = styled.p`
  width: 80%;
  margin: 24px 0 16px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
  word-break: keep-all;
`;

export const InputStyle = styled.input`
  width: 100%;
  height: 50px;
  margin-top: 5px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  // line-height: 0;
  color: ${(props) => props.theme.color.gray1};
  background: ${(props) => props.theme.color.gray5};
`;