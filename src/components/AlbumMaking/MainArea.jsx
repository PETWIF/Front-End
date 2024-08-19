import React, { useRef, useState, useEffect } from 'react';
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

export default function MainArea({ selectedImages, setSelectedImages }) {
  const { isCoverEditing, isTextEditing } = useStore();
  const fileInputRef = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [positions, setPositions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (selectedImages.length > positions.length) {
      setPositions((prevPositions) => [
        ...prevPositions,
        ...Array(selectedImages.length - prevPositions.length).fill({
          width: 200,
          height: 200,
          top: 0,
          left: 0,
          dragging: false,
          currentX: 0,
          currentY: 0,
          initialX: 0,
          initialY: 0,
          xOffset: 0,
          yOffset: 0,
        }),
      ]);
    }
  }, [selectedImages, positions.length]);

  const handleImageClick = (index, event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setSelectedIndex(index);
  };

  const handleContainerClick = () => {
    setSelectedIndex(null); // 다른 영역 클릭 시 선택 해제
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  const handleResize = (index, event, { size, handle }) => {
    setPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      const position = newPositions[index];

      if (!position) return newPositions;

      const deltaHeight = position.height - size.height;
      const deltaWidth = position.width - size.width;

      if (handle.includes('n')) {
        position.top += deltaHeight;
        if (position.top < 0) {
          position.top = 0; // 상단 경계 제한
        }
      }
      if (handle.includes('w')) {
        position.left += deltaWidth;
      }

      position.width = size.width;
      position.height = size.height;

      return newPositions;
    });
  };

  const handleDragStart = (index, event) => {
    if (index >= 0 && index < positions.length) {
      setDraggingIndex(index);
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[index].dragging = true;
        const rect = event.target.getBoundingClientRect();
        newPositions[index].initialX =
          event.clientX - newPositions[index].xOffset;
        newPositions[index].initialY =
          event.clientY - newPositions[index].yOffset;
        return newPositions;
      });
    }
  };

  const handleDragOver = (index, event) => {
    event.preventDefault();
    setPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      const position = newPositions[index];

      if (!position || !position.dragging) return newPositions;

      position.currentX = event.clientX - position.initialX;
      position.currentY = event.clientY - position.initialY;

      position.xOffset = position.currentX;
      position.yOffset = position.currentY;

      position.left = position.currentX >= 0 ? position.currentX : 0;
      position.top = position.currentY >= 0 ? position.currentY : 0;

      return newPositions;
    });
  };

  const handleDrop = (index) => {
    setDraggingIndex(null); // 드래그 완료 후 draggingIndex 초기화
    setPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions[index].dragging = false;
      newPositions[index].initialX = newPositions[index].currentX;
      newPositions[index].initialY = newPositions[index].currentY;
      return newPositions;
    });
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
        onDragOver={(e) => handleDragOver(draggingIndex, e)}
        onDrop={() => handleDrop(draggingIndex)}
        onClick={handleContainerClick}
      >
        {!isCoverEditing && selectedImages.length > 0 ? (
          <>
            {selectedImages.map((image, index) => (
              <ResizableBoxContainer
                key={index}
                width={positions[index]?.width || 200} // 기본값 200을 사용
                height={positions[index]?.height || 200} // 기본값 200을 사용
                minConstraints={[100, 100]}
                maxConstraints={[740, Infinity]}
                resizeHandles={['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']}
                onResize={(e, data) => handleResize(index, e, data)}
                selected={selectedIndex === index}
                style={{
                  top: positions[index]?.top,
                  left: positions[index]?.left,
                  position: 'absolute',
                  cursor: positions[index]?.dragging ? 'grabbing' : 'grab',
                }}
                onDragStart={(e) => handleDragStart(index, e)}
                onDragOver={(e) => handleDragOver(index, e)}
                onDrop={() => handleDrop(index)}
                onClick={(e) => handleImageClick(index, e)}
              >
                <ImagePreview src={image} alt={`Selected Image ${index + 1}`} />
              </ResizableBoxContainer>
            ))}
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
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept='image/*'
          multiple // 다중 파일 선택 가능
        />
      </MainContnetContainer>
    </MainContainer>
  );
}
