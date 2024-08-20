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

export default function MainArea({
  selectedImages,
  setSelectedImages,
  emoticons,
  setEmoticons,
}) {
  const { isCoverEditing, isTextEditing } = useStore();
  const fileInputRef = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [positions, setPositions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [emoticonPositions, setEmoticonPositions] = useState([]);

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

  useEffect(() => {
    if (emoticons.length > emoticonPositions.length) {
      setEmoticonPositions((prevPositions) => [
        ...prevPositions,
        ...Array(emoticons.length - prevPositions.length).fill({
          width: 100,
          height: 100,
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
  }, [emoticons, emoticonPositions.length]);

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
    const isEmoticon = index >= selectedImages.length;
    const positionsArray = isEmoticon ? emoticonPositions : positions;

    // 인덱스가 배열 길이 내에 있는지 확인
    const positionIndex = isEmoticon ? index - selectedImages.length : index;

    if (positionIndex < 0 || positionIndex >= positionsArray.length) {
      return; // 유효하지 않은 인덱스는 무시
    }

    // 새로운 배열을 만들어서 변경된 값을 업데이트
    const newPositions = [...positionsArray];
    const position = newPositions[positionIndex];

    if (!position) return;

    const deltaHeight = position.height - size.height;
    const deltaWidth = position.width - size.width;

    // 크기 조정 핸들이 포함된 방향에 따라 위치를 업데이트
    if (handle.includes('n')) {
      position.top += deltaHeight;
      if (position.top < 0) position.top = 0; // 상단 경계 제한
    }
    if (handle.includes('w')) {
      position.left += deltaWidth;
      if (position.left < 0) position.left = 0; // 좌측 경계 제한
    }

    // 비율을 유지하지 않도록 크기만 업데이트
    position.width = size.width;
    position.height = size.height;

    // 업데이트된 상태를 반영
    if (isEmoticon) {
      setEmoticonPositions(newPositions);
    } else {
      setPositions(newPositions);
    }
  };

  const handleDragStart = (index, event) => {
    const isEmoticon = index >= selectedImages.length;
    const positionsArray = isEmoticon ? emoticonPositions : positions;

    // 인덱스가 배열 길이 내에 있는지 확인
    const adjustedIndex = isEmoticon ? index - selectedImages.length : index;

    if (adjustedIndex < 0 || adjustedIndex >= positionsArray.length) {
      return; // 인덱스가 유효하지 않으면 함수 종료
    }

    // 새로운 배열을 만들어서 변경된 값을 업데이트
    const newPositions = [...positionsArray];
    const position = newPositions[adjustedIndex];

    // position 객체가 존재하는지 확인
    if (!position) {
      return; // position이 존재하지 않으면 함수 종료
    }

    position.dragging = true;
    position.initialX = event.clientX - position.xOffset;
    position.initialY = event.clientY - position.yOffset;

    if (isEmoticon) {
      setEmoticonPositions(newPositions);
    } else {
      setPositions(newPositions);
    }
  };

  const handleDragOver = (index, event) => {
    event.preventDefault();
    const isEmoticon = index >= selectedImages.length;
    const positionsArray = isEmoticon ? emoticonPositions : positions;

    // 인덱스가 배열 길이 내에 있는지 확인
    const adjustedIndex = isEmoticon ? index - selectedImages.length : index;

    if (adjustedIndex < 0 || adjustedIndex >= positionsArray.length) {
      return; // 유효하지 않은 인덱스는 무시
    }

    // 새로운 배열을 만들어서 변경된 값을 업데이트
    const newPositions = [...positionsArray];
    const position = newPositions[adjustedIndex];

    if (!position || !position.dragging) return;

    position.currentX = event.clientX - position.initialX;
    position.currentY = event.clientY - position.initialY;

    position.xOffset = position.currentX;
    position.yOffset = position.currentY;

    position.left = position.currentX >= 0 ? position.currentX : 0;
    position.top = position.currentY >= 0 ? position.currentY : 0;

    if (isEmoticon) {
      setEmoticonPositions(newPositions);
    } else {
      setPositions(newPositions);
    }
  };

  const handleDrop = (index) => {
    const isEmoticon = index >= selectedImages.length;
    const positionsArray = isEmoticon ? emoticonPositions : positions;

    // 인덱스가 배열 길이 내에 있는지 확인
    const adjustedIndex = isEmoticon ? index - selectedImages.length : index;

    if (adjustedIndex < 0 || adjustedIndex >= positionsArray.length) {
      return; // 유효하지 않은 인덱스는 무시
    }

    const newPositions = [...positionsArray];
    const position = newPositions[adjustedIndex];

    if (!position) {
      return; // position이 존재하지 않으면 함수 종료
    }

    position.dragging = false;
    position.initialX = position.currentX;
    position.initialY = position.currentY;

    setDraggingIndex(null);

    if (isEmoticon) {
      setEmoticonPositions(newPositions);
    } else {
      setPositions(newPositions);
    }
  };

  const handleDelete = (index) => {
    const isEmoticon = index >= selectedImages.length;

    if (isEmoticon) {
      setEmoticonPositions((prevPositions) =>
        prevPositions.filter((_, i) => i !== index - selectedImages.length)
      );
      setEmoticons((prevEmoticons) =>
        prevEmoticons.filter((_, i) => i !== index - selectedImages.length)
      );
    } else {
      setPositions((prevPositions) =>
        prevPositions.filter((_, i) => i !== index)
      );
      setSelectedImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    }
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
                <>
                  <ImagePreview
                    src={image}
                    alt={`Selected Image ${index + 1}`}
                  />
                  {selectedIndex === index && (
                    <button
                      style={{
                        position: 'absolute',
                        bottom: '-25px',
                        left: '47%',
                        backgroundColor: 'grey',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation(); // 클릭 이벤트가 다른 요소에 전달되지 않도록 방지
                        handleDelete(index); // 삭제 핸들러 호출
                      }}
                    >
                      X
                    </button>
                  )}
                </>
              </ResizableBoxContainer>
            ))}
            {emoticons.map((emoticon, index) => (
              <ResizableBoxContainer
                key={selectedImages.length + index}
                width={emoticonPositions[index]?.width || 100}
                height={emoticonPositions[index]?.height || 100}
                minConstraints={[50, 50]}
                maxConstraints={[740, Infinity]}
                resizeHandles={['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']}
                onResize={(e, data) =>
                  handleResize(selectedImages.length + index, e, data)
                }
                selected={selectedIndex === selectedImages.length + index}
                style={{
                  top: emoticonPositions[index]?.top,
                  left: emoticonPositions[index]?.left,
                  position: 'absolute',
                  cursor: emoticonPositions[index]?.dragging
                    ? 'grabbing'
                    : 'grab',
                }}
                onDragStart={(e) =>
                  handleDragStart(selectedImages.length + index, e)
                }
                onDragOver={(e) =>
                  handleDragOver(selectedImages.length + index, e)
                }
                onDrop={() => handleDrop(selectedImages.length + index)}
                onClick={(e) =>
                  handleImageClick(selectedImages.length + index, e)
                }
              >
                <>
                  <img
                    src={emoticon}
                    alt={`Emoticon ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                  />
                  {selectedIndex === selectedImages.length + index && (
                    <button
                      style={{
                        position: 'absolute',
                        bottom: '-25px',
                        left: '47%',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(selectedImages.length + index);
                      }}
                    >
                      X
                    </button>
                  )}
                </>
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
