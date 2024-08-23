import defaultImage from '../../dummy/images/profile.jpeg';

import * as S from './Avatar.style.jsx';

export default function Profile({ src, size }) {
  return <S.Profile src={src ?? defaultImage} alt={src} $size={size} />;
}
