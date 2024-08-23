import styled from 'styled-components';

import { Layout } from '../../components/Common';

export const EditLayout = styled.main`
  padding: 0 30px;
  display: flex;
  gap: 30px;
`;

export const EditContainer = styled(Layout)`
  flex: 1;
  padding: 33px 0 16px 33px;
  overflow: hidden;
`;

export const SideContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// export const PageContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   height: 100vh;
//   background: #f3f4f6;
//   padding: 10px;
//   gap: 2%;
//   margin-top: 0px;
// `;
