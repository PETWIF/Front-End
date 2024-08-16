import styled from 'styled-components';

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 6px 0;
  outline: none;
  border: none;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  border-bottom: 1px solid transparent;

  &:focus {
    border-color: ${(props) => props.theme.color.gray4};
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;
