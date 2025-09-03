import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import IngredientRequests from './pages/IngredientRequests/IngredientRequests'
import CreateChef from './pages/CreateChef/CreateChef'
import AdminLogin from './pages/AdminLogin/AdminLogin'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [token, setToken] = useState("")
  const [userRole, setUserRole] = useState("")
  const [userName, setUserName] = useState("")
  const url="http://localhost:4000"

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    const savedRole = localStorage.getItem("admin_role");
    const savedName = localStorage.getItem("admin_name");
    
    if (savedToken && savedRole === 'admin') {
      setToken(savedToken);
      setUserRole(savedRole);
      setUserName(savedName);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("admin_name");
    setToken("");
    setUserRole("");
    setUserName("");
  };

  if (!token || userRole !== 'admin') {
    return (
      <div>
        <ToastContainer/>
        <AdminLogin url={url} setToken={setToken} setUserRole={setUserRole} setUserName={setUserName} />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer/>
      <Navbar userName={userName} logout={logout}/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<IngredientRequests url={url} token={token}/>}/>
          <Route path='/ingredient-requests' element={<IngredientRequests url={url} token={token}/>}/>
          <Route path='/create-chef' element={<CreateChef url={url} token={token}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App