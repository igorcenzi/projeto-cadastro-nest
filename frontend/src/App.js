import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import DashboardPage from './pages/dashboard';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/login' element={<LoginPage/>}/>
          <Route exact path='/dashboard' element={<DashboardPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
