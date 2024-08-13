import { Button } from '../../../components/Button';
import {
  Checkbox,
  Dropdown,
  Radio,
  RadioGroup,
  TextInput,
} from '../../../components/Input';

import * as S from './DeleteAccountPage.style.jsx';

export default function DeleteAccountPage() {
  return (
    <S.SettingLayout>
      <S.Content>
        <S.Fieldset>
          <S.Title>계정 삭제</S.Title>
          <S.Field>
            <S.Text>
              계정을 탈퇴하면 앨범 / 친구 목록 / 사용자 정보 등 계정 내의 모든
              정보 및 활동들이 삭제됩니다. 정말 계정을 삭제하시겠습니까? 정말
              삭제하려면 "삭제합니다" 라고 적어주시기 바랍니다.
            </S.Text>
            <TextInput
              type='text'
              placeholder={`\"삭제합니다\"를 입력해주세요`}
            />
          </S.Field>
        </S.Fieldset>
        <Button padding='20px'>계정 삭제하기</Button>
      </S.Content>
    </S.SettingLayout>
  );
}
