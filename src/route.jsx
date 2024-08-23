import App from './App.jsx';
import { AddInfoPage } from './pages/AddInfoPage';
import { AgreePage } from './pages/AgreePage';
import { AlbumDetailPage } from './pages/AlbumDetailPage';
import { AlbumPage } from './pages/AlbumPage';
import { AlbumPostPage } from './pages/AlbumPostPage';
import { AlbumMakingPage } from './pages/AlbumMakingPage';
import { BookmarkPage } from './pages/BookmarkPage';
import { ChattingPage } from './pages/ChattingPage';
import { ExplorePage } from './pages/ExplorePage';
import { FriendPage } from './pages/FriendPage';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { PwdChangePage } from './pages/PwdChangePage';
import { PwdSearchPage } from './pages/PwdSearchPage';
import { RegisteredPage } from './pages/RegisteredPage';
import { SetNicknamePage } from './pages/SetNicknamePage';
import {
  BlockListPage,
  DeleteAccountPage,
  SettingPage,
  UpdateBlockListPage,
  HelpPage,
  VisibilityPreferencePage,
} from './pages/SettingPage';
import { SignUpPage } from './pages/SignUpPage';
import { UserProfilePage } from './pages/UserProfilePage';

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
            path: '/album/:nickname',
            element: <AlbumPage />,
          },
        ],
      },
      {
        path: '/album/:userId/detail/:albumId',
        element: <AlbumDetailPage />,
      },
      {
        path: '/album/bookmark/:userId',
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
      {
        path: '/user-profile',
        element: <UserProfilePage />,
      },
      {
        path: '/setting',
        element: <SettingPage />,
        children: [
          {
            index: true,
            element: <VisibilityPreferencePage />,
          },
          {
            path: '/setting/visivility',
            element: <VisibilityPreferencePage />,
          },
          {
            path: '/setting/block-list',
            element: <BlockListPage />,
          },
          {
            path: '/setting/update-block-list',
            element: <UpdateBlockListPage />,
          },
          {
            path: '/setting/help',
            element: <HelpPage />,
          },
          {
            path: '/setting/delete-account',
            element: <DeleteAccountPage />,
          },
        ],
      },
    ],
  },
];
