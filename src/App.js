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
import Registration from './components/registration/registration';
import KycStatuss from './components/kycstatus/kycstatus';
import MyProfile from './components/myprofile/myprofile';
import UpdateProfile from './components/updateprofile/updateprofile';


function App() {
  return (
    <InvestorProvider>  
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route path='investors' element={<Investor />} />
              <Route path='registration' element={<Registration />} />
            
              <Route path='history' element={<Historyy />} />
              <Route path='/' element={<Company />} />
              <Route path='assignStocks/:md' element={<Assignstocks />} />
              <Route path='sellStocks/:md' element={<Sell />} />
              <Route path='/myprofile' element={<MyProfile/>} />
              <Route path="/updateprofile" element={<UpdateProfile/>} />
              <Route path='/login' element={<Login />} />
              

            </Route>
            <Route path='kycstatus' element={<KycStatuss />} />
            
          </Routes>
        </div>
      </Router>
    </InvestorProvider>
  );
}

export default App;
