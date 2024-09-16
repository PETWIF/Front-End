
import { Icon } from '../Icon';
import { Button } from '../Button';

import * as S from './ReportModal.style.jsx';

export default function ReportModal ({ type, close }) {
  return (
    <S.ModalLayout>
      <S.Modal>
        {type === 'warning' ? (
          <>
            <Icon id='warning' width='230px' height='43px' />
            <S.Text>
              신고가 완료되었어요!
            </S.Text>
            <S.ButtonContainer>
                <Button buttonStyle='light' padding='10px' onClick={close}>
                  돌아가기
                </Button>
            </S.ButtonContainer>
          </>
        ) : (
          <>
            <S.Text>
              신고가 완료되었어요!
            </S.Text>
            <S.ButtonContainer>
                <Button buttonStyle='orange' padding='10px'>
                  확인
                </Button>
            </S.ButtonContainer>
          </>
        )}
      </S.Modal>
    </S.ModalLayout>
  );
}
