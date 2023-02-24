import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../AppContext';
import '../styles/sidebar.css';

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const { data, setData } = useContext(AppContext);
  const { isSidebarOpen } = data;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 992) {
        setData({ ...data, isSidebarOpen: true });
      } else {
        setData({ ...data, isSidebarOpen: false });
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, setData]);

  const handleSidebarClose = () => {
    if (window.innerWidth <= 992) {
      setData({ ...data, isSidebarOpen: false });
    }
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <nav className='navigation'>
        <ul>
          <Link to='/' onClick={() => handleSidebarClose()}>
            <li className={path === '/' ? 'active' : ''}>
              <img src='./svg-icons/home.svg' alt='home' width={22} height={22} />
              <span className='navigation-item'>Home</span>
            </li>
          </Link>

          <Link to='/tictactoe' onClick={() => handleSidebarClose()}>
            <li className={path === '/tictactoe' ? 'active' : ''}>
              <img src='./svg-icons/tictactoe.svg' alt='tictactoe' width={22} height={22} />
              <span className='navigation-item'>Tic Tac Toe</span>
            </li>
          </Link>

          <Link to='/snake' onClick={() => handleSidebarClose()}>
            <li className={path === '/snake' ? 'active' : ''}>
              <img src='./svg-icons/snake.svg' alt='snake' width={22} height={22} />
              <span className='navigation-item'>Snake</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
