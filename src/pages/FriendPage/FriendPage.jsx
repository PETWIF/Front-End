import { Link, Outlet } from 'react-router-dom';

import { AdComponent } from '../../components/AdComponent';
import { Button } from '../../components/Button';
import { RandomFriend } from '../../components/RandomFriend';

import AdImg from '../../dummy/images/cat1.png';

import * as S from './FriendPage.style.jsx';

export default function FriendPage() {
  return (
    <S.FriendLayout>
      <S.MenuBox>
        <Link to='/friend/list'>
          <Button buttonStyle='white' hasBorder padding='13px'>
            친구 목록
          </Button>
        </Link>
        <Link to='/friend/sentList'>
          <Button buttonStyle='white' hasBorder padding='13px'>
            보낸 요청
          </Button>
        </Link>
        <Link to='/friend/receivedList'>
          <Button buttonStyle='white' hasBorder padding='13px'>
            받은 요청
          </Button>
        </Link>
      </S.MenuBox>
      <S.Content>
        <Outlet />
      </S.Content>
      <S.RightSide>
        <RandomFriend />
        <AdComponent adImage={AdImg} adText='광고 컴포넌트입니다' />
      </S.RightSide>
    </S.FriendLayout>
  );
}
