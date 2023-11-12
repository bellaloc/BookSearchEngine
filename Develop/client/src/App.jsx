import './App.css';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from './utils/queries'; 
import Navbar from './components/Navbar';

const App = () => {
  

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
