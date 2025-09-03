import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
    <div className="sidebar-options">
        <NavLink to='/'className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Chef Ingredient Requests</p>
        </NavLink >
        <NavLink to='/create-chef'className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Create Chef Account</p>
        </NavLink >
    </div>
    </div>
  )
}

export default Sidebar