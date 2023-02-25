import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import '../styles/header.css';

export default function Header() {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const { data, setData } = useContext(AppContext);
  const { isSidebarOpen } = data;

  const toggleSidebar = () => {
    setData({ ...data, isSidebarOpen: !isSidebarOpen });
  };

  return (
    <header className='header'>
      <div className='px-3'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='p-3 mr-5 text-gray-300 cursor-pointer' onClick={toggleSidebar}>
              <svg viewBox='0 0 24 24' width='24' height='24'>
                {!isSidebarOpen ? (
                  <>
                    <rect x='2' y='5' width='20' height='2' rx='1' ry='1' fill='#ffffff' />
                    <rect x='2' y='11' width='20' height='2' rx='1' ry='1' fill='#ffffff' />
                    <rect x='2' y='17' width='20' height='2' rx='1' ry='1' fill='#ffffff' />
                  </>
                ) : (
                  <>
                    <line x1='4' y1='4' x2='20' y2='20' stroke='#ffffff' strokeWidth='2' />
                    <line x1='4' y1='20' x2='20' y2='4' stroke='#ffffff' strokeWidth='2' />
                  </>
                )}
              </svg>
            </div>
            <Link to='/' className='text-gray-100 hover:text-gray-300'>
              My App
            </Link>
          </div>

          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <Link to='/' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                Home
              </Link>
              <Link
                to='/tictactoe'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                Tic Tac Toe
              </Link>
              <Link
                to='/snake'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                Snake
              </Link>
            </div>
          </div>

          <div className='mr-2 flex md:hidden' onClick={() => setIsHeaderOpen(!isHeaderOpen)}>
            <span className='sr-only'>Open main menu</span>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              {!isHeaderOpen ? (
                <>
                  <rect x='2' y='5' width='20' height='2' rx='1' ry='1' fill='#ffffff' />
                  <rect x='2' y='11' width='20' height='2' rx='1' ry='1' fill='#ffffff' />
                  <rect x='2' y='17' width='20' height='2' rx='1' ry='1' fill='#ffffff' />
                </>
              ) : (
                <>
                  <line x1='4' y1='4' x2='20' y2='20' stroke='#ffffff' strokeWidth='2' />
                  <line x1='4' y1='20' x2='20' y2='4' stroke='#ffffff' strokeWidth='2' />
                </>
              )}
            </svg>
          </div>
        </div>
      </div>

      <div className={`${isHeaderOpen ? '' : 'hidden'} md:hidden`} id='mobile-menu'>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          <Link
            to='/'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
            Home
          </Link>
          <Link
            to='/tictactoe'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
            Tic Tac Toe
          </Link>
          <Link
            to='/snake'
            className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
            Snake
          </Link>
        </div>
      </div>
    </header>
  );
}
