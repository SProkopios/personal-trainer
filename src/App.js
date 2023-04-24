import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Link to="/">Home</Link>{' '}
          <Link to="/Customerlist">Customerlist</Link>{' '}
          <Link to="/Traininglist">Traininglist</Link>{' '}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Customerlist" element={<CustomerList />} />
            <Route path="/Traininglist" element={<TrainingList />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
