import styled from 'styled-components';

import { Layout } from '../Common';

export const ModalLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const Modal = styled(Layout)`
  width: 372px;
  padding: 23px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 26px;
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  word-break: keep-all;
  color: ${(props) => props.theme.color.black};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;   
  gap: 10px;
`;
