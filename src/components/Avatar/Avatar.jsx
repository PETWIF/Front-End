import * as S from './Avatar.style.jsx';

export default function Profile({ src, size }) {
  return <S.Profile src={src} $size={size} />;
}
