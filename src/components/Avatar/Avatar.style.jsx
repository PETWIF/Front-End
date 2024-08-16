import styled, { css } from 'styled-components';

export const Profile = styled.img`
  ${(props) => css`
    width: ${props.$size || '55px'};
    height: ${props.$size || '55px'};
  `};

  border-radius: 100%;
`;
