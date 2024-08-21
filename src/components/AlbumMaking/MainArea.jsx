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
  const inputFieldRef = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [positions, setPositions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [emoticonPositions, setEmoticonPositions] = useState([]);
  const [textPositions, setTextPositions] = useState([]);
  const [inputText, setInputText] = useState(''); // 추가된 상태
  const [texts, setTexts] = useState([]);
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState('MyCustomFont1');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isParagraph, setIsParagraph] = useState(false);
  const [textAlign, setTextAlign] = useState('left');

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

  useEffect(() => {
    if (texts.length > textPositions.length) {
      setTextPositions((prevPositions) => [
        ...prevPositions,
        ...Array(texts.length - prevPositions.length).fill({
          width: 200,
          height: 50,
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
  }, [texts, textPositions.length]);

  useEffect(() => {
    if (
      selectedIndex !== null &&
      selectedIndex >= selectedImages.length + emoticons.length
    ) {
      const textIndex =
        selectedIndex - selectedImages.length - emoticons.length;
      if (textIndex >= 0 && textIndex < texts.length) {
        const selectedText = texts[textIndex];
        setFontSize(selectedText.fontSize);
        setFontFamily(selectedText.fontFamily);
        setIsBold(selectedText.fontWeight === 'bold');
        setIsItalic(selectedText.fontStyle === 'italic');
        setIsUnderline(selectedText.textDecoration === 'underline');
        setTextAlign(selectedText.textAlign);
      }
    }
  }, [selectedIndex]);

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
    let positionsArray;
    if (index < selectedImages.length) {
      positionsArray = positions;
    } else if (index < selectedImages.length + emoticons.length) {
      positionsArray = emoticonPositions;
    } else {
      positionsArray = textPositions;
    }

    const positionIndex =
      index -
      (positionsArray === positions
        ? 0
        : positionsArray === emoticonPositions
          ? selectedImages.length
          : selectedImages.length + emoticons.length);

    if (positionIndex < 0 || positionIndex >= positionsArray.length) {
      return; // 유효하지 않은 인덱스는 무시
    }

    const newPositions = [...positionsArray];
    const position = newPositions[positionIndex];

    if (!position) return;

    const deltaHeight = position.height - size.height;
    const deltaWidth = position.width - size.width;

    if (handle.includes('n')) {
      position.top += deltaHeight;
      if (position.top < 0) position.top = 0; // 상단 경계 제한
    }
    if (handle.includes('w')) {
      position.left += deltaWidth;
      if (position.left < 0) position.left = 0; // 좌측 경계 제한
    }

    position.width = size.width;
    position.height = size.height;

    if (positionsArray === positions) {
      setPositions(newPositions);
    } else if (positionsArray === emoticonPositions) {
      setEmoticonPositions(newPositions);
    } else {
      setTextPositions(newPositions);
    }
  };

  const handleDragStart = (index, event) => {
    let positionsArray;
    if (index < selectedImages.length) {
      positionsArray = positions;
    } else if (index < selectedImages.length + emoticons.length) {
      positionsArray = emoticonPositions;
    } else {
      positionsArray = textPositions;
    }

    const adjustedIndex =
      index -
      (positionsArray === positions
        ? 0
        : positionsArray === emoticonPositions
          ? selectedImages.length
          : selectedImages.length + emoticons.length);

    if (adjustedIndex < 0 || adjustedIndex >= positionsArray.length) {
      return;
    }

    const newPositions = [...positionsArray];
    const position = newPositions[adjustedIndex];

    if (!position) return;

    position.dragging = true;
    position.initialX = event.clientX - position.xOffset;
    position.initialY = event.clientY - position.yOffset;

    if (positionsArray === positions) {
      setPositions(newPositions);
    } else if (positionsArray === emoticonPositions) {
      setEmoticonPositions(newPositions);
    } else {
      setTextPositions(newPositions);
    }
  };

  const handleDragOver = (index, event) => {
    event.preventDefault();
    let positionsArray;
    if (index < selectedImages.length) {
      positionsArray = positions;
    } else if (index < selectedImages.length + emoticons.length) {
      positionsArray = emoticonPositions;
    } else {
      positionsArray = textPositions;
    }

    const adjustedIndex =
      index -
      (positionsArray === positions
        ? 0
        : positionsArray === emoticonPositions
          ? selectedImages.length
          : selectedImages.length + emoticons.length);

    if (adjustedIndex < 0 || adjustedIndex >= positionsArray.length) {
      return;
    }

    const newPositions = [...positionsArray];
    const position = newPositions[adjustedIndex];

    if (!position || !position.dragging) return;

    position.currentX = event.clientX - position.initialX;
    position.currentY = event.clientY - position.initialY;

    position.xOffset = position.currentX;
    position.yOffset = position.currentY;

    position.left = position.currentX >= 0 ? position.currentX : 0;
    position.top = position.currentY >= 0 ? position.currentY : 0;

    if (positionsArray === positions) {
      setPositions(newPositions);
    } else if (positionsArray === emoticonPositions) {
      setEmoticonPositions(newPositions);
    } else {
      setTextPositions(newPositions);
    }
  };

  const handleDrop = (index) => {
    let positionsArray;
    if (index < selectedImages.length) {
      positionsArray = positions;
    } else if (index < selectedImages.length + emoticons.length) {
      positionsArray = emoticonPositions;
    } else {
      positionsArray = textPositions;
    }

    const adjustedIndex =
      index -
      (positionsArray === positions
        ? 0
        : positionsArray === emoticonPositions
          ? selectedImages.length
          : selectedImages.length + emoticons.length);

    if (adjustedIndex < 0 || adjustedIndex >= positionsArray.length) {
      return;
    }

    const newPositions = [...positionsArray];
    const position = newPositions[adjustedIndex];

    if (!position) return;

    position.dragging = false;
    position.initialX = position.currentX;
    position.initialY = position.currentY;

    setDraggingIndex(null);

    if (positionsArray === positions) {
      setPositions(newPositions);
    } else if (positionsArray === emoticonPositions) {
      setEmoticonPositions(newPositions);
    } else {
      setTextPositions(newPositions);
    }
  };

  const handleDelete = (index) => {
    if (index < selectedImages.length) {
      setPositions((prevPositions) =>
        prevPositions.filter((_, i) => i !== index)
      );
      setSelectedImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    } else if (index < selectedImages.length + emoticons.length) {
      setEmoticonPositions((prevPositions) =>
        prevPositions.filter((_, i) => i !== index - selectedImages.length)
      );
      setEmoticons((prevEmoticons) =>
        prevEmoticons.filter((_, i) => i !== index - selectedImages.length)
      );
    } else {
      setTextPositions((prevPositions) =>
        prevPositions.filter(
          (_, i) => i !== index - selectedImages.length - emoticons.length
        )
      );
      setTexts((prevTexts) =>
        prevTexts.filter(
          (_, i) => i !== index - selectedImages.length - emoticons.length
        )
      );
    }
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value); // 입력된 텍스트를 상태로 업데이트
  };

  const handleTextSubmit = () => {
    if (inputText.trim() !== '') {
      const newText = isParagraph ? inputText + '\n' : inputText;
      setTexts([
        ...texts,
        {
          text: newText,
          fontSize, // 폰트 크기만 유지
          fontFamily, // 폰트 패밀리만 유지
          fontWeight: 'normal', // 기본값은 'normal'로 설정
          fontStyle: 'normal', // 기본값은 'normal'로 설정
          textDecoration: 'none', // 기본값은 'none'으로 설정
          textAlign: textAlign,
        },
      ]);
      setInputText(''); // InputField 초기화
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleTextSubmit(); // 엔터 키를 누르면 텍스트 추가
    }
  };

  const handleParagraphClick = () => {
    setInputText((prevText) => prevText + '\n');
    inputFieldRef.current.focus(); // 줄 바꿈 후에 InputField에 포커스 유지
  };

  const handleFontSizeChange = (event) => {
    const newSize = event.target.value;

    if (
      selectedIndex !== null &&
      selectedIndex >= selectedImages.length + emoticons.length
    ) {
      const textIndex =
        selectedIndex - selectedImages.length - emoticons.length;
      if (textIndex >= 0 && textIndex < texts.length) {
        const updatedTexts = [...texts];
        updatedTexts[textIndex] = {
          ...updatedTexts[textIndex],
          fontSize: newSize,
        };
        setTexts(updatedTexts);

        // 상태가 업데이트된 후에 바로 반영
        setFontSize(newSize);
      }
    } else {
      setFontSize(newSize); // 새로운 텍스트에 적용될 기본값
    }
  };

  const handleFontFamilyChange = (event) => {
    const newFamily = event.target.value;

    if (
      selectedIndex !== null &&
      selectedIndex >= selectedImages.length + emoticons.length
    ) {
      const textIndex =
        selectedIndex - selectedImages.length - emoticons.length;
      if (textIndex >= 0 && textIndex < texts.length) {
        const updatedTexts = [...texts];
        updatedTexts[textIndex] = {
          ...updatedTexts[textIndex],
          fontFamily: newFamily,
        };
        setTexts(updatedTexts);

        // 상태가 업데이트된 후에 바로 반영
        setFontFamily(newFamily);
      }
    } else {
      setFontFamily(newFamily); // 새로운 텍스트에 적용될 기본값
    }
  };

  const handleTextAlignLeft = () => {
    if (
      selectedIndex !== null &&
      selectedIndex >= selectedImages.length + emoticons.length
    ) {
      const textIndex =
        selectedIndex - selectedImages.length - emoticons.length;
      if (textIndex >= 0 && textIndex < texts.length) {
        const updatedTexts = [...texts];
        updatedTexts[textIndex] = {
          ...updatedTexts[textIndex],
          textAlign: 'left',
        };
        setTexts(updatedTexts);

        // 상태가 업데이트된 후에 바로 반영
        setTextAlign('left');
      }
    }
  };

  const handleTextAlignCenter = () => {
    if (
      selectedIndex !== null &&
      selectedIndex >= selectedImages.length + emoticons.length
    ) {
      const textIndex =
        selectedIndex - selectedImages.length - emoticons.length;
      if (textIndex >= 0 && textIndex < texts.length) {
        const updatedTexts = [...texts];
        updatedTexts[textIndex] = {
          ...updatedTexts[textIndex],
          textAlign: 'center',
        };
        setTexts(updatedTexts);

        // 상태가 업데이트된 후에 바로 반영
        setTextAlign('center');
      }
    }
  };

  const handleTextAlignRight = () => {
    if (
      selectedIndex !== null &&
      selectedIndex >= selectedImages.length + emoticons.length
    ) {
      const textIndex =
        selectedIndex - selectedImages.length - emoticons.length;
      if (textIndex >= 0 && textIndex < texts.length) {
        const updatedTexts = [...texts];
        updatedTexts[textIndex] = {
          ...updatedTexts[textIndex],
          textAlign: 'right',
        };
        setTexts(updatedTexts);

        // 상태가 업데이트된 후에 바로 반영
        setTextAlign('right');
      }
    }
  };

  const handleBold = () => {
    if (
      selectedIndex !== null &&
      selectedIndex >= selectedImages.length + emoticons.length
    ) {
      const textIndex =
        selectedIndex - selectedImages.length - emoticons.length;
      if (textIndex >= 0 && textIndex < texts.length) {
        const updatedTexts = [...texts];
        updatedTexts[textIndex] = {
          ...updatedTexts[textIndex],
          fontWeight:
            updatedTexts[textIndex].fontWeight === 'bold' ? 'normal' : 'bold',
        };
        setTexts(updatedTexts);

        // 상태가 업데이트된 후에 다시 한번 상태를 확인하여 툴바를 업데이트합니다.
        setIsBold(updatedTexts[textIndex].fontWeight === 'bold');
      }
    }
  };

  const handleItalic = () => {
    if (
      selectedIndex !== null &&
      selectedIndex >= selectedImages.length + emoticons.length
    ) {
      const textIndex =
        selectedIndex - selectedImages.length - emoticons.length;
      if (textIndex >= 0 && textIndex < texts.length) {
        const updatedTexts = [...texts];
        updatedTexts[textIndex] = {
          ...updatedTexts[textIndex],
          fontStyle:
            updatedTexts[textIndex].fontStyle === 'italic'
              ? 'normal'
              : 'italic',
        };
        setTexts(updatedTexts);

        // 상태가 업데이트된 후에 다시 한번 상태를 확인하여 툴바를 업데이트합니다.
        setIsItalic(updatedTexts[textIndex].fontStyle === 'italic');
      }
    }
  };

  const handleUnderline = () => {
    if (
      selectedIndex !== null &&
      selectedIndex >= selectedImages.length + emoticons.length
    ) {
      const textIndex =
        selectedIndex - selectedImages.length - emoticons.length;
      if (textIndex >= 0 && textIndex < texts.length) {
        const updatedTexts = [...texts];
        updatedTexts[textIndex] = {
          ...updatedTexts[textIndex],
          textDecoration:
            updatedTexts[textIndex].textDecoration === 'underline'
              ? 'none'
              : 'underline',
        };
        setTexts(updatedTexts);

        // 상태가 업데이트된 후에 다시 한번 상태를 확인하여 툴바를 업데이트합니다.
        setIsUnderline(updatedTexts[textIndex].textDecoration === 'underline');
      }
    }
  };

  return (
    <MainContainer $isCoverEditing={isCoverEditing}>
      <MainTitleContainer $isCoverEditing={isCoverEditing}>
        {isTextEditing && (
          <>
            <ToolbarContainer>
              <ToolbarItem onClick={handleParagraphClick}>단락</ToolbarItem>
              <ToolbarItem>
                <StyledSelect
                  onChange={handleFontFamilyChange}
                  value={fontFamily}
                >
                  <StyledOption value='MyCustomFont1'>어그로체</StyledOption>
                  <StyledOption value='MyCustomFont2'>
                    Decoschool(영)
                  </StyledOption>
                  <StyledOption value='MyCustomFont3'>
                    Decoshadow(영)
                  </StyledOption>
                  <StyledOption value='MyCustomFont4'>갈무리</StyledOption>
                  <StyledOption value='MyCustomFont5'>가을소풍</StyledOption>
                  <StyledOption value='MyCustomFont6'>곧은제목</StyledOption>
                  <StyledOption value='MyCustomFont7'>꾸러기</StyledOption>
                  <StyledOption value='MyCustomFont8'>돌담</StyledOption>
                  <StyledOption value='MyCustomFont10'>바른바탕</StyledOption>
                  <StyledOption value='MyCustomFont11'>봄방학</StyledOption>
                  <StyledOption value='MyCustomFont12'>분필</StyledOption>
                  <StyledOption value='MyCustomFont13'>붓펜</StyledOption>
                  <StyledOption value='MyCustomFont14'>산뜻돋움</StyledOption>
                  <StyledOption value='MyCustomFont15'>산뜻바탕</StyledOption>
                </StyledSelect>
              </ToolbarItem>
              <ToolbarItem>
                <StyledSelect onChange={handleFontSizeChange} value={fontSize}>
                  <StyledOption value={12}>12px</StyledOption>
                  <StyledOption value={14}>14px</StyledOption>
                  <StyledOption value={16}>16px</StyledOption>
                  <StyledOption value={18}>18px</StyledOption>
                  <StyledOption value={20}>20px</StyledOption>
                  <StyledOption value={24}>24px</StyledOption>
                  <StyledOption value={32}>32px</StyledOption>
                  <StyledOption value={48}>48px</StyledOption>
                </StyledSelect>
              </ToolbarItem>
              <ToolbarItem $active={isBold} onClick={handleBold}>
                <Icon id='textbold' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem $active={isItalic} onClick={handleItalic}>
                <Icon id='textitalic' width='19' height='19' />
              </ToolbarItem>
              <ToolbarItem $active={isUnderline} onClick={handleUnderline}>
                <Icon id='textunderline' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem
                $active={textAlign === 'left'}
                onClick={handleTextAlignLeft}
              >
                <Icon id='textleft' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem
                $active={textAlign === 'center'}
                onClick={handleTextAlignCenter}
              >
                <Icon id='textcenter' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem
                $active={textAlign === 'right'}
                onClick={handleTextAlignRight}
              >
                <Icon id='textright' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem>
                <Icon id='addlink' width='24' height='24' />
              </ToolbarItem>
              <ToolbarItem>
                <Icon id='mdicolor' width='28' height='28' />
              </ToolbarItem>
            </ToolbarContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '50%',
              }}
            >
              <InputField
                ref={inputFieldRef}
                placeholder='여기에 텍스트 입력...'
                value={inputText}
                onChange={handleTextChange}
                onKeyPress={handleKeyPress}
                style={{ fontSize: `18px` }}
              />
              <button
                onClick={handleTextSubmit}
                style={{
                  padding: '5px 10px',
                  width: '15%',
                  height: '100%',
                  borderRadius: '0 0 5px 0',
                  border: '1px solid black',
                }}
              >
                입 력
              </button>
            </div>
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
                        fontSize: '12px',
                        lineHeight: '20px',
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
                        backgroundColor: 'grey',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        lineHeight: '20px',
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
            {texts.map((textObj, index) => (
              <div
                key={selectedImages.length + emoticons.length + index}
                style={{
                  position: 'absolute',
                  top: textPositions[index]?.top,
                  left: textPositions[index]?.left,
                  cursor: textPositions[index]?.dragging ? 'grabbing' : 'grab',
                  border:
                    selectedIndex ===
                    selectedImages.length + emoticons.length + index
                      ? '2px solid blue'
                      : 'none',
                  whiteSpace: 'pre-wrap',
                  fontSize: `${textObj.fontSize}px`,
                  fontFamily: textObj.fontFamily,
                  fontWeight: textObj.fontWeight,
                  fontStyle: textObj.fontStyle,
                  textDecoration: textObj.textDecoration,
                  textAlign: textObj.textAlign,
                }}
                onDragStart={(e) =>
                  handleDragStart(
                    selectedImages.length + emoticons.length + index,
                    e
                  )
                }
                onDragOver={(e) =>
                  handleDragOver(
                    selectedImages.length + emoticons.length + index,
                    e
                  )
                }
                onDrop={() =>
                  handleDrop(selectedImages.length + emoticons.length + index)
                }
                onClick={(e) =>
                  handleImageClick(
                    selectedImages.length + emoticons.length + index,
                    e
                  )
                }
              >
                {textObj.text}
                {selectedIndex ===
                  selectedImages.length + emoticons.length + index && (
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
                      fontSize: '12px',
                      lineHeight: '20px',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(
                        selectedImages.length + emoticons.length + index
                      );
                    }}
                  >
                    X
                  </button>
                )}
              </div>
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
