import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

import './index.css';

const router = createBrowserRouter([
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
        path: '/friend',
        element: <FriendPage />,
      },
      {
        path: '/chatting',
        element: <ChattingPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
