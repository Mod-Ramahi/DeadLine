import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/homepage/Home';
import Signin from './pages/loginpage/Signin'
import RouteWithNavBar from './components/routewithnavbar/RoutWithNavBar';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RouteWithNavBar/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
