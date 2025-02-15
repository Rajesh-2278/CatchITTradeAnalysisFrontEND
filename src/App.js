import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Company from './components/company/company';
import Investor from './components/investor/investor';
import Assignstocks from './components/stocks/assignstocks';
import Login from './components/login/login';
import { InvestorProvider } from './contexts/InvestorProvider'; 
import Historyy from './components/hostory/history';
import Sell from './components/sell/sell';

function App() {
  return (
    <InvestorProvider>  
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route path='investors' element={<Investor />} />
              <Route path='history' element={<Historyy />} />
              <Route path='/' element={<Company />} />
              <Route path='assignStocks/:md' element={<Assignstocks />} />
              <Route path='sellStocks/:md' element={<Sell />} />
              <Route path='/login' element={<Login />} />
            </Route>
            
          </Routes>
        </div>
      </Router>
    </InvestorProvider>
  );
}

export default App;
