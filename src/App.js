import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Company from './components/company/company';
import Investor from './components/investor/investor';
import Assignstocks from './components/stocks/assignstocks';
import Login from './components/login/login';
import { InvestorProvider } from './contexts/InvestorProvider'; 
import MyProfile from './components/myprofile/myprofile';
import Register from './components/register/register';
import ValidateKYC from './components/kyc/validateKYC';

function App() {
  return (
    <InvestorProvider>  
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route path='investors' element={<Investor />} />
              <Route path='/' element={<Company />} />
              <Route path='assignStocks/:md' element={<Assignstocks />} />
              <Route path='/login' element={<Login />} />
              <Route path='/myprofile' element={<MyProfile/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/validateInvestor/:id' element={<ValidateKYC/>} />
            </Route>
            
          </Routes>
        </div>
      </Router>
    </InvestorProvider>
  );
}

export default App;
