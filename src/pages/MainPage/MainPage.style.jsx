import styled from 'styled-components';
import { Layout } from '../../components/Common';

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: auto;
  box-sizing: border-box;
  margin-left: auto; /* Add this line */
`;

export const WhiteBox = styled(Layout)`
  width: 80%;
  height: auto;
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;
