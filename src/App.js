import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Company from './components/company/company';
import Investor from './components/investor/investor';
import Assignstocks from './components/stocks/assignstocks';
import Login from './components/login/login';
import { UserProvider } from './contexts/UserProvider'; 

function App() {
  return (
    <UserProvider>  
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route path='investors' element={<Investor />} />
              <Route path='/' element={<Company />} />
              <Route path='assignStocks/:md' element={<Assignstocks />} />
            </Route>
            <Route path='/log' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
