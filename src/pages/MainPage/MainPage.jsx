import { AdComponent } from '../../components/AdComponent';
import { AlbumUpdates } from '../../components/AlbumUpdates';
import { Feed } from '../../components/Feed';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { Profile } from '../../components/Profile';
import { RandomFriend } from '../../components/RandomFriend';

import {
  AlbumUpdatesFeedContainer,
  Content,
  MainContainer,
  WhiteBox,
  Story
} from './MainPage.style';

const MainPage = () => {
  const adImage = '/path/to/your/ad-image.jpg';
  const adText = '스티커 광고';

  return (
    <MainContainer>
      <WhiteBox>
        <AlbumUpdatesFeedContainer>
          <Story>
            <AlbumUpdates />
          </Story>
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
