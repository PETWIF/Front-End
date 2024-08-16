import * as S from './AlbumButton.style.jsx';

export default function AlbumButton({ children, onClick }) {
  return <S.Button onClick={onClick}>{children}</S.Button>;
}
