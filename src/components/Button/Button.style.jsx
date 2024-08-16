import styled, { css } from 'styled-components';

export const Button = styled.button`
  ${(props) => {
    if (props.$style === 'white') {
      return css`
        background-color: ${props.theme.color.white};
        color: ${props.theme.color.primary};
      `;
    }

    if (props.$style === 'light') {
      return css`
        background-color: ${props.theme.color.secondary};
        color: ${props.theme.color.primary};
      `;
    }

    if (props.$style === 'gray') {
      return css`
        background-color: ${props.theme.color.gray5};
        color: ${props.theme.color.gray};
      `;
    }

    return css`
      background-color: ${props.theme.color.primary};
      color: ${props.theme.color.white};
    `;
  }};

  width: ${(props) => props.$width || '100%'};
  border-radius: ${(props) => props.$borderRadius || '10px'};
  font-weight: 400;
  line-height: 29px;
  text-align: center;
  padding: ${(props) => `${props.$padding || 0} 0`};
  border: ${(props) =>
    props.$hasBorder && `1px solid ${props.theme.color.primary}`};
  font-size: ${(props) => props.$fontSize || '16px'};

  &:disabled {
    background: ${(props) => props.theme.color.gray4};
    color: ${(props) => props.theme.color.gray2};
    cursor: auto;
  }
`;
