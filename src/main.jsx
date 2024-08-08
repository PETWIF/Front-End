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
import AlbumMakingPage from './pages/AlbumMakingPage/AlbumMakingPage';

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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
