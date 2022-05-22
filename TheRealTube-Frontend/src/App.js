import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import './App.css';
import Registration from './Registration';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import PlayerPage from './PlayerPage';

function App() {
  return (
    <Routes>
        <Route exec path="/" element={<MainPage/>}></Route>
        <Route exec path='/Login' element={<Login/>}></Route>
        <Route exec path='/Registration' element={<Registration/>}></Route>
        <Route exec path='/Search/:title' element={<SearchPage/>}></Route>
        <Route exec path='/Play/:id' element={<PlayerPage/>}></Route>
        <Route exec path="*" element={<MainPage/>}></Route>
    </Routes>
  );
}

export default App;
