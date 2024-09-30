
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'
import Home from './pages/home.tsx';
import Category from './pages/category.tsx';
import MovieView from './pages/movie-view.tsx';
import Bookmarks from './pages/bookmarks.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/category',
    element: <Category />
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