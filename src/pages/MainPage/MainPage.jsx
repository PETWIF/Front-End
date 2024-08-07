import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Profile from '../../components/Profile/Profile';
import RandomFriend from '../../components/RandomFriend/RandomFriend';
import Modal from '../../components/Modal/Modal';
import AdComponent from '../../components/AdComponent/AdComponent';
import { MainContainer, Content, WhiteBox } from './MainPage.style';

const MainPage = () => {
  const adImage = '/path/to/your/ad-image.jpg';
  const adText = '스티커 광고';

  return (
    <MainContainer>
      <Sidebar />
      <WhiteBox>
          {/* 여기 안에 원하는 내용을 추가하세요 */}
        </WhiteBox>
      <Content>
        <RandomFriend />
        <AdComponent adImage={adImage} adText={adText} />
      </Content>
    </MainContainer>
  );
};

export default MainPage;
