import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { routeList } from './route.jsx';
import './index.css';

const router = createBrowserRouter(routeList);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        if (error.response.status === 404) {
          return;
        }
        alert(error.response.data.message);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.response.status === 404) {
        return;
      }
      alert(error.response.data.message);
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
