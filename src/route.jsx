import App from './App.jsx';
import { AlbumDetailPage } from './pages/AlbumDetailPage';
import { AlbumPage } from './pages/AlbumPage';
import { AlbumPostPage } from './pages/AlbumPostPage';
import { BookmarkPage } from './pages/BookmarkPage';
import { ChattingPage } from './pages/ChattingPage';
import { ExplorePage } from './pages/ExplorePage';
import { FriendPage } from './pages/FriendPage';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { PwdSearchPage } from './pages/PwdSearchPage';
import { PwdChangePage } from './pages/PwdChangePage';
import { SignUpPage } from './pages/SignUpPage';
import { AgreePage } from './pages/AgreePage';
import { SetNicknamePage } from './pages/SetNicknamePage';
import { AddInfoPage } from './pages/AddInfoPage';
import { RegisteredPage } from './pages/RegisteredPage';
import AlbumMakingPage from './pages/AlbumMakingPage/AlbumMakingPage';

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
        meta: { hideHeader: true },
      },
      {
        path: '/searchPwd',
        element: <PwdSearchPage />,
        meta: { hideHeader: true },
      },
      {
        path: '/changePwd',
        element: <PwdChangePage />,
        meta: { hideHeader: true },
      },
      {
        path: '/signup',
        element: <SignUpPage />,
        meta: { hideHeader: true },
      },
      {
        path: '/agree',
        element: <AgreePage />,
        meta: { hideHeader: true },
      },
      {
        path: '/setNickname',
        element: <SetNicknamePage />,
        meta: { hideHeader: true },
      },
      {
        path: '/addInfo',
        element: <AddInfoPage />,
        meta: { hideHeader: true },
      },
      {
        path: '/registered',
        element: <RegisteredPage />,
        meta: { hideHeader: true },
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
            path: '/album/:userId',
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
