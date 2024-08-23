import { useState } from 'react';

import { Button } from '../../components/Button';
import { Radio, RadioGroup } from '../Input';

import * as S from './Edit.style.jsx';

export default function Edit({ album }) {
  const [title, setTitle] = useState(album.title);
  const [content, setContent] = useState(album.content);
  const [scope, setScope] = useState(album.scope);

  return (
    <S.EditContainer>
      <S.Fieldset>
        <div>
          <S.B>앨범 제목</S.B>
          <S.Input
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='앨범 제목을 입력해주세요'
          />
        </div>
        <div>
          <S.B>앨범 문구</S.B>
          <S.TextArea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder='문구를 입력해주세요'
          />
        </div>
        <div>
          <S.B>공개 범위</S.B>
          <RadioGroup
            name='scope'
            defaultValue={album.scope}
            callback={setScope}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '10px 0',
              gap: '20px',
            }}
          >
            <Radio value='ALL' defaultChecked={album.scope === 'ALL'}>
              전체 공개
            </Radio>
            <Radio value='FRIEND' defaultChecked={album.scope === 'FRIEND'}>
              친구한테만 공개
            </Radio>
            <Radio value='MY' defaultChecked={album.scope === 'MY'}>
              비공개
            </Radio>
          </RadioGroup>
        </div>
      </S.Fieldset>
      <Button padding='14px' borderRadius='5px'>
        수정하기
      </Button>
    </S.EditContainer>
  );
}
