import styled from 'styled-components';

export const SearchBox = styled.div`
  margin: 20px 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 16px;
  outline: none;
  border: none;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 8px;

  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    color: #b3b3b3;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;
