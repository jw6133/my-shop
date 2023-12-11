import './App.css';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { GoogleAuthProvider } from 'firebase/auth';
import {Globalstyle} from './style/GlobalStyle';
import AllProduct from './pages/AllProduct';

//outlet 상위 경로에서 하위경로 요소 구성
function App() {
  return (
    <>
    <AuthContextProvider>
      {/* <GlobalStyle/> */}
      <Nav/>
      <AllProduct/>
      <Outlet/>
    </AuthContextProvider>
    </>
  );
}

export default App;
