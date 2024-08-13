import { Button } from '../../../components/Button';
import {
  Checkbox,
  Dropdown,
  Radio,
  RadioGroup,
  TextInput,
} from '../../../components/Input';

import * as S from './VisibilityPreferencePage.style.jsx';

export default function VisibilityPreferencePage() {
  return (
    <S.SettingLayout>
      <S.Content>
        <S.Fieldset>
          <S.Title>계정 공개 범위</S.Title>
          <S.Field>
            <S.Label>공개 여부</S.Label>
            <S.Text>
              비공개 설정 시 친구들만 사용자의 앨범 또는 친구 목록을 확인할 수
              있습니다
            </S.Text>
            <RadioGroup
              name='visibility'
              defaultValue='public'
              callback={() => {}}
            >
              <Radio value='public' defaultChecked>
                공개
              </Radio>
              <Radio value='private'>비공개</Radio>
            </RadioGroup>
          </S.Field>
        </S.Fieldset>
        <Button padding='20px'>설정하기</Button>
      </S.Content>
    </S.SettingLayout>
  );
}
