import logo from './logo.svg';
import './App.css';
import Company from './components/company/company';
import Investor from './components/investor/investor';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' Component={Navbar}>
            <Route path='/investors' Component={Investor}> </Route>
            <Route path='/companies' Component={Company}> </Route>
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
