import styled from 'styled-components';

import { Layout } from '../../components/Common';

export const EditContainer = styled(Layout)`
  width: 100%;
  padding: 30px 20px;
`;

export const Fieldset = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #f87f28;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  outline: none;

  &:focus {
    border-color: #f87f28;
  }
`;

export const B = styled.div`
  margin-bottom: 4px;
  font-size: 20px;
  font-weight: bold;
`;

// 앨범 커버

export const AlbumContainer = styled.div`
  width: 35%;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const AlbumCover = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  background: #e0e0e0;
`;
