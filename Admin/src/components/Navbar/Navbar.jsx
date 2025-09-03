import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = ({ userName, logout }) => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <div className="navbar-right">
          {userName && <span className="admin-name">Welcome, {userName}</span>}
          <img className='profile' src={assets.profile_image} alt="" />
          {logout && <button onClick={logout} className="logout-btn">Logout</button>}
        </div>
    </div>
  )
}

export default Navbar