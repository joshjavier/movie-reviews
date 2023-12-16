import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/root.jsx';
import MoviesList from './routes/movies-list.jsx';
import Movie from './routes/movie.jsx';
import AddReview from './routes/add-review.jsx';
import Login from './routes/login.jsx';
import { moviesLoader, movieLoader } from './loaders.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'movies',
        element: <MoviesList />,
        loader: moviesLoader,
      },
      {
        path: 'movies/:id',
        element: <Movie />,
        loader: movieLoader,
      },
      {
        path: 'movies/:id/review',
        element: <AddReview />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
