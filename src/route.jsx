import App from './App.jsx';
import { AlbumDetailPage } from './pages/AlbumDetailPage/index.js';
import { AlbumPage } from './pages/AlbumPage/index.js';
import { AlbumPostPage } from './pages/AlbumPostPage/index.js';
import { BookmarkPage } from './pages/BookmarkPage/index.js';
import { ChattingPage } from './pages/ChattingPage/index.js';
import { ExplorePage } from './pages/ExplorePage/index.js';
import { FriendPage } from './pages/FriendPage/index.js';
import { MainPage } from './pages/MainPage/index.js';
import { LoginPage } from './pages/LoginPage/index.js';
import { PwdSearchPage } from './pages/PwdSearchPage/index.js';
import { PwdChangePage } from './pages/PwdChangePage/index.js';
import { SignUpPage } from './pages/SignUpPage/index.js';
import { AgreePage } from './pages/AgreePage/index.js';
import { SetNicknamePage } from './pages/SetNicknamePage/index.js';
import { AddInfoPage } from './pages/AddInfoPage/index.js';
import { RegisteredPage } from './pages/RegisteredPage/index.js';
import AlbumMakingPage from './pages/AlbumMakingPage/AlbumMakingPage.jsx';

export const routeList = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/searchPwd',
        element: <PwdSearchPage />,
      },
      {
        path: '/changePwd',
        element: <PwdChangePage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/agree',
        element: <AgreePage />,
      },
      {
        path: '/setNickname',
        element: <SetNicknamePage />,
      },
      {
        path: '/addInfo',
        element: <AddInfoPage />,
      },
      {
        path: '/registered',
        element: <RegisteredPage />,
      },
      {
        path: '/home',
        element: <MainPage />,
      },
      {
        path: '/explore',
        element: <ExplorePage />,
      },
      {
        path: '/album',
        element: <AlbumPage />,
        children: [
          {
            path: ':userId',
            element: <AlbumPage />,
          },
        ],
      },
      {
        path: '/album/detail/:albumId',
        element: <AlbumDetailPage />,
      },
      {
        path: '/album/bookmark',
        element: <BookmarkPage />,
      },
      {
        path: '/album/post',
        element: <AlbumPostPage />,
      },
      {
        path: '/album-create',
        element: <AlbumMakingPage />, // AlbumMakingPage 경로 추가
      },
      {
        path: '/friend',
        element: <FriendPage />,
      },
      {
        path: '/chatting',
        element: <ChattingPage />,
      },
    ],
  },
];
