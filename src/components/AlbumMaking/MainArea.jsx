import React from 'react';
import { useStore } from '../../store/store';
import {
  Button,
  MainContainer,
  Paragraph1,
  Paragraph2,
  MainTitleContainer,
  MainContnetContainer,
  ToolbarContainer,
  ToolbarItem,
  InputField,
  StyledSelect,
  StyledOption,
} from './MainArea.style';

import { Icon } from '../Icon';

export default function MainArea() {
  const { isCoverEditing, isTextEditing } = useStore();

  return (
    <MainContainer $isCoverEditing={isCoverEditing}>
      <MainTitleContainer $isCoverEditing={isCoverEditing}>
        {isTextEditing && (
          <>
            <ToolbarContainer>
              <ToolbarItem>
                <StyledSelect>
                  <StyledOption>단락</StyledOption>
                </StyledSelect>
              </ToolbarItem>
              <ToolbarItem>
                <StyledSelect>
                  <StyledOption>Helvetica</StyledOption>
                </StyledSelect>
              </ToolbarItem>
              <ToolbarItem>
                <StyledSelect>
                  <StyledOption>20</StyledOption>
                  <StyledOption>18</StyledOption>
                </StyledSelect>
              </ToolbarItem>
              <ToolbarItem>
                <Icon id='textbold' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem>
                <Icon id='textitalic' width='19' height='19' />
              </ToolbarItem>
              <ToolbarItem>
                <Icon id='textunderline' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem>
                <Icon id='textleft' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem>
                <Icon id='textcenter' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem>
                <Icon id='textright' width='24' height='24' />
              </ToolbarItem>
            </ToolbarContainer>
            <InputField placeholder='여기에 텍스트 입력...' />
          </>
        )}
      </MainTitleContainer>
      <MainContnetContainer $isCoverEditing={isCoverEditing}>
        {isCoverEditing ? (
          <>
            <Paragraph1 $isCoverEditing={isCoverEditing}>
              표지를 만들어보세요:
            </Paragraph1>
            <Button $isCoverEditing={isCoverEditing}>파일 선택</Button>
            <Paragraph2 $isCoverEditing={isCoverEditing}>
              혹은 사진을 드래그 앤 드롭
            </Paragraph2>
          </>
        ) : (
          <>
            <Paragraph1>나만의 앨범을 만들어보세요:</Paragraph1>
            <Button>파일 선택</Button>
            <Paragraph2>혹은 사진을 드래그 앤 드롭</Paragraph2>
          </>
        )}
      </MainContnetContainer>
    </MainContainer>
  );
}
