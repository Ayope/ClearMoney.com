import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from '@/features/auth/pages/Login.jsx';
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
import Categories from './features/categories/pages/Categories';
import PageNotFound from './features/404';
import Goals from './features/goals/pages/Goals';
import CreateGoalForm from './features/goals/pages/AddGoal';
import UpdateGoalForm from './features/goals/pages/UpdateGoal';
import IsAuth from './guards/isAuth';
import IsNotAuth from './guards/isNotAuth';

function App() {  

  return (
    <UserContextProvider>
      <div>
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<IsNotAuth component={UserLayout}/>}>
            
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

            <Route path="/categories" element={<Categories/>}/>

            <Route path="/goals" element={<Goals/>}/>
            <Route path="/add-goal" element={<CreateGoalForm/>}/>
            <Route path="/update-goal/:id" element={<UpdateGoalForm/>}/>

            <Route path="*" element={<PageNotFound/>}/>
          </Route>
          <Route path="/register" element={<IsAuth component={Register} />}/>
          <Route path="/login" element={<IsAuth component={LogIn} />}/>
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
