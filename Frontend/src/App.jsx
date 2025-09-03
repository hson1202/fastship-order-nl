import React , { useState, useEffect }from 'react'
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import CreateIngredientRequest from './pages/CreateIngredientRequest/CreateIngredientRequest';
import ViewMyRequests from './pages/ViewMyRequests/ViewMyRequests';
import ChefLogin from './pages/ChefLogin/ChefLogin';
import './App.css';

const App = () => {
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const location = useLocation();

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
    <div className='app'>
      <div className="app-header">
        <h1>🚀 FASTSHIP ORDER NL</h1>
        <div className="chef-info">
          <span>Xin chào, {userName}</span>
          <button onClick={logout} className="logout-btn">Đăng xuất</button>
        </div>
      </div>
      
      <div className="app-navigation">
        <Link 
          to="/" 
          className={location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          📝 Đặt Nguyên Liệu
        </Link>
        <Link 
          to="/my-requests" 
          className={location.pathname === "/my-requests" ? "nav-link active" : "nav-link"}
        >
          📋 Yêu Cầu Của Tôi
        </Link>
      </div>

      <Routes>
        <Route path='/' element={<CreateIngredientRequest />} />
        <Route path='/my-requests' element={<ViewMyRequests />} />
      </Routes>
    </div>
  )
}

export default App;