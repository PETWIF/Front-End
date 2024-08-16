import { Link } from 'react-router-dom';

import { Icon } from '../Icon';
import { Button } from '../Button';

import * as S from './LoginModal.style.jsx';

export default function LoginModal({ type, close }) {
  return (
    <S.ModalLayout>
      <S.Modal>
        {type === 'warning' ? (
          <>
            <Icon id='warning' width='230px' height='43px' />
            <S.Text>
              회원 가입이 아직 진행 중이에요.
              <br />
              로그인 화면으로 돌아가시겠어요?
            </S.Text>
            <S.ButtonContainer>
              <Button buttonStyle='orange' padding='10px' onClick={close}>
                회원 가입 진행하기
              </Button>
              <Link to='/login'>
                <Button buttonStyle='light' padding='10px'>
                  로그인 페이지 돌아가기
                </Button>
              </Link>
            </S.ButtonContainer>
          </>
        ) : (
          <>
            <S.Text>
              비밀번호가 변경되었어요.
              <br />
              변경된 비밀번호로 다시 로그인해 주세요.
            </S.Text>
            <S.ButtonContainer>
              <Link to='/login'>
                <Button buttonStyle='orange' padding='10px'>
                  확인
                </Button>
              </Link>
            </S.ButtonContainer>
          </>
        )}
      </S.Modal>
    </S.ModalLayout>
  );
}
