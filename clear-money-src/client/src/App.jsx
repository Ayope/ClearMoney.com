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
import Revenues from './features/revenues/pages/Revenues';
import CreateRevenueForm from './features/revenues/pages/AddRevenue';
import UpdateRevenueForm from './features/revenues/pages/UpdateRevenue';
import Expenses from './features/expenses/pages/Expenses';
import CreateExpenseForm from './features/expenses/pages/AddExpense';
import UpdateExpenseForm from './features/expenses/pages/UpdateExpense';
import DailyExpenses from './features/dailyExpenses/pages/DailyExpenses';
import CreateDailyExpenseForm from './features/dailyExpenses/pages/AddDailyExpense';
import UpdateDailyExpenseForm from './features/dailyExpenses/pages/UpdateDailyExpense';

function App() {  

  return (
    <UserContextProvider>
      <div>
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout/>}>
            
            <Route index element={<UserDashboard/>}/>
            
            <Route path="/revenues" element={<Revenues/>}/>
            <Route path="/add-revenue" element={<CreateRevenueForm/>}/>
            <Route path="/update-revenue/:id" element={<UpdateRevenueForm/>}/>

            <Route path="/expenses" element={<Expenses/>}/>
            <Route path="/add-expense" element={<CreateExpenseForm/>}/>
            <Route path="/update-expense/:id" element={<UpdateExpenseForm/>}/>

            <Route path="/daily-expenses" element={<DailyExpenses/>}/>
            <Route path="/add-daily-expense" element={<CreateDailyExpenseForm/>}/>
            <Route path="/update-daily-expense/:id" element={<UpdateDailyExpenseForm/>}/>

          </Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<LoginIn/>}/>
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
