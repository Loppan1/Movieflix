
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'
import Home from './pages/home.tsx';
import Categories from './pages/categories.tsx';
import MovieView from './pages/movie-view.tsx';
import Bookmarks from './pages/bookmarks.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/categories',
    element: <Categories />
  },
  {
    path: '/bookmarks',
    element: <Bookmarks />
  },
  { 
    path: '/movieview/:movieid',
    element: <MovieView />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>);