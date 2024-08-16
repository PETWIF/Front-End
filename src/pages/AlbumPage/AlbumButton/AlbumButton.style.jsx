import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 9px 20px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.color.white};
  border-radius: 10px;
  font-weight: 400;
  font-size: 12px;
  line-height: 25px;
  color: ${(props) => props.theme.color.white};

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;
