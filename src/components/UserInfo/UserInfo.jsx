import { Link } from 'react-router-dom';

import { Button } from '../Button';
import { Layout } from '../Common';
import { Avatar } from '../Avatar';
import { Profile } from '../../dummy/images';

import { RANDOM_FRIENDS } from '../../dummy/data';

import * as S from './UserInfo.style.jsx';

const nickname = '댕댕산책가';

export default function UserInfo() {
  return (
    <S.UserInfoLayout>
      <S.UserInfoItem>
        <div>
          <Link to={`/album/${nickname}`}>
            <Avatar src={Profile} size='66px' />
          </Link>
          <span>{nickname}</span>
        </div>
        <Button
          onClick={() => console.log(`${nickname}를 친구 추가하였습니다.`)}
          width='100px'
          padding='8px'
          borderRadius='5px'
        >
          친구 추가
        </Button>
      </S.UserInfoItem>
    </S.UserInfoLayout>
  );
}
