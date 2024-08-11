import styled from 'styled-components';

export const InputStyle = styled.input`
  width: 100%;
  padding: 16px 10px;
  color: ${(props) => props.theme.color.gray1};
  background: ${(props) => props.theme.color.gray5};
  border-radius: 10px;
  border: none;
  outline: none;
  font-weight: 400;
  font-size: 14px;

  &::placeholder {
    color: #b3b3b3;
  }
`;
