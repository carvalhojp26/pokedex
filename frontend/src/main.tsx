import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './tailwind.css';
import Favorite from './pages/Favorite';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/favorite' element={<Favorite/>}/>
        </Routes>
    </Router>
);