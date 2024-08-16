import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Profile as Img } from '../../dummy/images';

import * as S from './Profile.style.jsx';

const nickname = '펫위프';

const PROFILE_INFO_LIST = [
  { label: '친구', value: 20 },
  { label: '앨범', value: 20 },
  { label: '좋아요', value: 103 },
  { label: '북마크', value: 23 },
];

export default function Profile({ userId }) {
  return (
    <S.ProfileLayout>
      <S.TopContainer>
        <div>
          <Avatar src={Img} size='66px' />
          <S.NicknameContianer>
            <span>{nickname}</span>
            <Icon id='check' width='20' height='20' />
          </S.NicknameContianer>
        </div>
        <Button
          buttonStyle='gray'
          padding='8px'
          onClick={() => console.log('프로필 편집')}
        >
          프로필 편집
        </Button>
      </S.TopContainer>
      <S.Description>짧은 소개글을 쓸 수 있는 자리입니다.</S.Description>
      <S.ProfileInfoList>
        {PROFILE_INFO_LIST.map(({ label, value }) => (
          <S.ProfileInfoItem key={label}>
            <span>{value}</span>
            <span>{label}</span>
          </S.ProfileInfoItem>
        ))}
      </S.ProfileInfoList>
    </S.ProfileLayout>
  );
}
