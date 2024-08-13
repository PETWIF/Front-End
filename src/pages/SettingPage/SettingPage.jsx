import { Link, Outlet } from 'react-router-dom';

import { Button } from '../../components/Button';

import * as S from './SettingPage.style.jsx';

export default function SettingPage() {
  return (
    <S.SettingLayout>
      <S.MenuBox>
        <Link to='/setting/visivility'>
          <Button buttonStyle='white' hasBorder padding='13px'>
            계정 공개 범위
          </Button>
        </Link>
        <Link to='/setting/block-list'>
          <Button buttonStyle='white' hasBorder padding='13px'>
            차단 계정 목록
          </Button>
        </Link>
        <Link to='/setting/update-block-list'>
          <Button buttonStyle='white' hasBorder padding='13px'>
            업데이트를 보지 않도록 설정한 계정
          </Button>
        </Link>
        <Link to='/setting/help'>
          <Button buttonStyle='white' hasBorder padding='13px'>
            도움말
          </Button>
        </Link>
        <Link to='/setting/delete-account'>
          <Button buttonStyle='white' hasBorder padding='13px'>
            계정 삭제
          </Button>
        </Link>
      </S.MenuBox>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.SettingLayout>
  );
}
