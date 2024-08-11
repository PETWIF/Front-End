import styled from 'styled-components';

export const InputStyle = styled.input`
  width: 100%;
  padding: 10px 14px;
  color: ${(props) => props.theme.color.gray1};
  background: ${(props) => props.theme.color.gray5};
  border-radius: 10px;
  border: none;
  outline: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.005em;

  &::placeholder {
    color: #999999;
  }
`;
