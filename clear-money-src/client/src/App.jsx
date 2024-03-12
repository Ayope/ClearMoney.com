import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginIn from '@/features/auth/pages/Login.jsx';
import Register from '@/features/auth/pages/Register.jsx';
import UserDashboard from './features/dashboard/pages/UserDashboard';
import UserLayout from './layouts/UserLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { UserContextProvider } from './context/UserContext';

function App() {  

  return (
    <UserContextProvider>
      <div>
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout/>}>
            <Route index element={<UserDashboard/>}/>
          </Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<LoginIn/>}/>
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
