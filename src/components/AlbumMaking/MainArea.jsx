import React, { useRef, useState } from 'react';
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
  ImagePreview,
  ResizableBoxContainer,
} from './MainArea.style';

import 'react-resizable/css/styles.css';
import { Icon } from '../Icon';

export default function MainArea({ selectedImage, setSelectedImage }) {
  const { isCoverEditing, isTextEditing } = useStore();
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const [size, setSize] = useState({
    width: 200,
    height: 200,
    top: 0,
    left: 0,
  });
  const [dragging, setDragging] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleResize = (event, { size, handle }) => {
    setSize((prevState) => {
      let newTop = prevState.top;
      let newLeft = prevState.left;

      if (handle === 'e') {
        return { ...prevState, width: size.width };
      } else if (handle === 'w') {
        newLeft = prevState.left + (prevState.width - size.width);
        return {
          ...prevState,
          width: size.width,
          left: newLeft >= 0 ? newLeft : 0,
        };
      } else if (handle === 'n') {
        newTop = prevState.top + (prevState.height - size.height);
        return {
          ...prevState,
          height: size.height,
          top: newTop >= 0 ? newTop : 0,
        };
      } else if (handle === 's') {
        return { ...prevState, height: size.height };
      } else if (handle === 'ne') {
        newTop = prevState.top + (prevState.height - size.height);
        return {
          ...prevState,
          width: size.width,
          height: size.height,
          top: newTop >= 0 ? newTop : 0,
        };
      } else if (handle === 'nw') {
        newTop = prevState.top + (prevState.height - size.height);
        newLeft = prevState.left + (prevState.width - size.width);
        return {
          ...prevState,
          width: size.width,
          height: size.height,
          top: newTop >= 0 ? newTop : 0,
          left: newLeft >= 0 ? newLeft : 0,
        };
      } else if (handle === 'se') {
        return { ...prevState, width: size.width, height: size.height };
      } else if (handle === 'sw') {
        newLeft = prevState.left + (prevState.width - size.width);
        return {
          ...prevState,
          width: size.width,
          height: size.height,
          left: newLeft >= 0 ? newLeft : 0,
        };
      }
      return prevState;
    });
  };

  const handleDragStart = (event) => {
    setDragging(true);

    // 현재 이미지의 위치를 계산하여 오프셋을 설정
    const rect = imageRef.current.getBoundingClientRect();
    setInitialX(event.clientX - xOffset);
    setInitialY(event.clientY - yOffset);
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    // 드래그 중 실시간으로 마우스 위치를 기반으로 이미지 위치를 계산
    setCurrentX(event.clientX - initialX);
    setCurrentY(event.clientY - initialY);

    setXOffset(currentX >= 0 ? currentX : 0);
    setYOffset(currentY >= 0 ? currentY : 0);

    setSize((prevState) => ({
      ...prevState,
      left: currentX >= 0 ? currentX : 0,
      top: currentY >= 0 ? currentY : 0,
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    setInitialX(currentX);
    setInitialY(currentY);
  };

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
              <ToolbarItem>
                <Icon id='addlink' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem>
                <Icon id='mdicolor' width='28' height='28' />
              </ToolbarItem>
            </ToolbarContainer>
            <InputField placeholder='여기에 텍스트 입력...' />
          </>
        )}
      </MainTitleContainer>
      <MainContnetContainer
        $isCoverEditing={isCoverEditing}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!isCoverEditing && selectedImage ? (
          <>
            <ResizableBoxContainer
              width={size.width}
              height={size.height}
              minConstraints={[100, 100]}
              maxConstraints={[740, Infinity]}
              resizeHandles={['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']}
              onResize={handleResize}
              style={{
                top: size.top,
                left: size.left,
                position: 'absolute',
                cursor: dragging ? 'grabbing' : 'grab',
              }}
            >
              <ImagePreview
                ref={imageRef}
                src={selectedImage}
                alt='Selected Image'
                onDragStart={handleDragStart}
              />
            </ResizableBoxContainer>
          </>
        ) : (
          <>
            <Paragraph1 $isCoverEditing={isCoverEditing}>
              {isCoverEditing
                ? '표지를 만들어보세요:'
                : '나만의 앨범을 만들어보세요:'}
            </Paragraph1>
            <Button
              $isCoverEditing={isCoverEditing}
              onClick={handleButtonClick}
            >
              파일 선택
            </Button>
            <Paragraph2 $isCoverEditing={isCoverEditing}>
              {isCoverEditing
                ? '혹은 사진을 드래그 앤 드롭'
                : '혹은 사진을 드래그 앤 드롭'}
            </Paragraph2>
          </>
        )}
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }} // input을 숨깁니다
          onChange={handleFileChange}
          accept='image/*' // 이미지 파일만 선택할 수 있도록 제한합니다
        />
      </MainContnetContainer>
    </MainContainer>
  );
}
