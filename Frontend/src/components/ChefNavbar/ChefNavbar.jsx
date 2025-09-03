import React from 'react'
import './ChefNavbar.css'
import { Link, useLocation } from 'react-router-dom'

const ChefNavbar = ({ userName, logout }) => {
  const location = useLocation();

  return (
    <div className='chef-navbar'>
      <div className="chef-navbar-left">
        <h2>FASTSHIP ORDER NL</h2>
      </div>
      <div className="chef-navbar-center">
        <ul className="chef-navbar-menu">
          <Link to="/" className={location.pathname === "/" || location.pathname === "/create-request" ? "active" : ""}>
            Order Nguyên Liệu
          </Link>
        </ul>
      </div>
      <div className="chef-navbar-right">
        <span className="chef-name">Xin chào, {userName}</span>
        <button onClick={logout} className="logout-btn">Đăng xuất</button>
      </div>
    </div>
  )
}

export default ChefNavbar
