import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AppContext from './AppContext';
import { store } from './data/store';
import './App.css';

function App() {
  const [data, setData] = useState(store);
  const { isSidebarOpen } = data;

  return (
    <AppContext.Provider value={{ data, setData }}>
      <div className='app'>
        <Header />
        <div className='content'>
          <Sidebar />

          <div className={`main-content ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
