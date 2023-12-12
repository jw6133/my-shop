import './App.css';
import Nav from './components/Nav';
import { Outlet, Routes,Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { GoogleAuthProvider } from 'firebase/auth';
import AllProduct from './pages/AllProduct';
import GlobalStyle from './style/GlobalStyle';

//outlet 상위 경로에서 하위경로 요소 구성
function App() {
  return (
    <>
    <AuthContextProvider>
      <GlobalStyle/>
      <Nav/>
      <Routes>
        <Route path='/' element={<AllProduct/>}/>
      </Routes>
      {/* <AllProduct/> */}
      <Outlet/>
    </AuthContextProvider>
    </>
  );
}

export default App;
