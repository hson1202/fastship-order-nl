import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import ChefNavbar from './src/components/ChefNavbar/ChefNavbar';
import ChefLogin from './src/pages/ChefLogin/ChefLogin';
import CreateIngredientRequest from './src/pages/CreateIngredientRequest/CreateIngredientRequest';
import './App.css';

const ChefApp = () => {
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("chef_token");
    const savedRole = localStorage.getItem("chef_role");
    const savedName = localStorage.getItem("chef_name");
    
    if (savedToken && savedRole === 'chef') {
      setToken(savedToken);
      setUserRole(savedRole);
      setUserName(savedName);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("chef_token");
    localStorage.removeItem("chef_role");
    localStorage.removeItem("chef_name");
    setToken("");
    setUserRole("");
    setUserName("");
  };

  if (!token || userRole !== 'chef') {
    return <ChefLogin setToken={setToken} setUserRole={setUserRole} setUserName={setUserName} />;
  }

  return (
    <div className='chef-app'>
      <ChefNavbar userName={userName} logout={logout} />
              <Routes>
          <Route path='/' element={<CreateIngredientRequest />} />
          <Route path='/create-request' element={<CreateIngredientRequest />} />
        </Routes>
    </div>
  )
}

export default ChefApp;
