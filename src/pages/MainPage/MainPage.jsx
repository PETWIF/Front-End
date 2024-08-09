// MainPage.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import RandomFriend from '../../components/RandomFriend/RandomFriend';
import Modal from '../../components/Modal/Modal';
import AdComponent from '../../components/AdComponent/AdComponent';
import AlbumUpdates from '../../components/AlbumUpdates/AlbumUpdates';
import Feed from '../../components/Feed/Feed';
import { MainContainer, Content, WhiteBox, AlbumUpdatesFeedContainer } from './MainPage.style';

const MainPage = () => {
  const adImage = '/path/to/your/ad-image.jpg';
  const adText = '스티커 광고';

  return (
    <MainContainer>
      <WhiteBox>
        <AlbumUpdatesFeedContainer>
          <AlbumUpdates />
          <Feed />
        </AlbumUpdatesFeedContainer>
      </WhiteBox>
      <Content>
        <RandomFriend />
        <AdComponent adImage={adImage} adText={adText} />
      </Content>
    </MainContainer>
  );
};

export default MainPage;
