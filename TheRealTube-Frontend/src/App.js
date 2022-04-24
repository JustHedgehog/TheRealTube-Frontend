import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import './App.css';
import Registration from './Registration';
function App() {
  return (
    <Routes>
        <Route exec path='/' element={<Login/>}></Route>
    </Routes>
  );
}

export default App;
