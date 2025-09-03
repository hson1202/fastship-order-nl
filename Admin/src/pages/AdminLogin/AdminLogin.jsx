import React, { useState } from 'react'
import './AdminLogin.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminLogin = ({ url, setToken, setUserRole, setUserName }) => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    
    try {
      const response = await axios.post(`${url}/api/user/login`, data)
      
      if (response.data.success) {
        if (response.data.role === 'admin') {
          setToken(response.data.token)
          setUserRole(response.data.role)
          setUserName(response.data.name)
          
          localStorage.setItem("admin_token", response.data.token)
          localStorage.setItem("admin_role", response.data.role)
          localStorage.setItem("admin_name", response.data.name)
          
          toast.success("Admin login successful!")
        } else {
          toast.error("Access denied. Admin privileges required!")
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Login failed. Please try again!")
      console.error(error)
    }
  }

  return (
    <div className='admin-login'>
      <div className="admin-login-container">
        <div className="admin-login-header">
          <h2>Admin Login</h2>
          <p>Please login with admin credentials to access the admin panel</p>
        </div>
        
        <form onSubmit={onLogin} className="admin-login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              name='email' 
              onChange={onChangeHandler} 
              value={data.email} 
              type="email" 
              placeholder='admin@example.com' 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              name='password' 
              onChange={onChangeHandler} 
              value={data.password} 
              type="password" 
              placeholder='Enter your password' 
              required 
            />
          </div>
          
          <button type="submit" className="login-btn">
            Login to Admin Panel
          </button>
        </form>
        
        <div className="admin-login-footer">
          <p>Only authorized admin users can access this panel</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
