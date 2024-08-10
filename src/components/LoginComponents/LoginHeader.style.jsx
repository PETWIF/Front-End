import styled from 'styled-components';

import { Flex } from '../../components/Common';

export const Header = styled(Flex)`
  height: 95px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray3};
`;
