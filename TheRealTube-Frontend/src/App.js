import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import './App.css';
import Registration from './Registration';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import PlayerPage from './PlayerPage';
import UploadVideo from './UploadVideo';
import MyVideos from './MyVideos';
import ControlPanel from './ControlPanel';
import Avatar from './Avatar';

function App() {
  return (
    <Routes>
        <Route exec path="/" element={<MainPage/>}></Route>
        <Route exec path='/Login' element={<Login/>}></Route>
        <Route exec path='/Registration' element={<Registration/>}></Route>
        <Route exec path='/Search/:title' element={<SearchPage/>}></Route>
        <Route exec path='/Play/:id' element={<PlayerPage/>}></Route>
        <Route exec path='/Upload' element={<UploadVideo/>}></Route>
        <Route exec path='/Avatar' element={<Avatar/>}></Route>
        <Route exec path='/MyVideos' element={<MyVideos/>}></Route>
        <Route exec path='/Admin' element={<ControlPanel/>}></Route>
        <Route exec path="*" element={<MainPage/>}></Route>
    </Routes>
  );
}

export default App;
