import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import TicTacToe from './features/tictactoe/TicTacToe';
import Snake from './features/snake/Snake';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/tictactoe',
        element: <TicTacToe />,
      },
      {
        path: '/snake',
        element: <Snake />,
      },
    ],
  },
]);
