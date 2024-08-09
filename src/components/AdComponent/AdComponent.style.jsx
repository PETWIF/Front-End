import styled from 'styled-components';
import { Layout } from '../Common';

export const AdLayout = styled(Layout)`
  padding: 30px 20px;
  width: 100%;
  height: 272px;
  background: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
`;

export const AdImagePlaceholder = styled.div`
  width: 100%;
  height: 60%;
  background-color: #ffedd5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #ff8c00;
`;

export const AdImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

export const AdText = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${(props) => props.theme.color.black};
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  border-radius: 0 0 15px 15px;
`;
