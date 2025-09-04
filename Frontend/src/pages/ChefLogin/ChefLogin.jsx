import React, { useState } from 'react'
import './ChefLogin.css'
import axios from 'axios'
import { API_ENDPOINTS } from '../../config/config'

const ChefLogin = ({ setToken, setUserRole, setUserName }) => {
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    restaurant: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    
    // Ngăn việc submit liên tục
    if (isLoading) return
    
    setIsLoading(true)
    let apiUrl
    
    if (currState === "Login") {
      apiUrl = API_ENDPOINTS.LOGIN
    } else {
      apiUrl = API_ENDPOINTS.REGISTER
      // Thêm role chef khi đăng ký
      data.role = "chef"
    }

    try {
      const response = await axios.post(apiUrl, data)
      
      if (response.data.success) {
        if (response.data.role === 'chef') {
          setToken(response.data.token)
          setUserRole(response.data.role)
          setUserName(response.data.name)
          
          localStorage.setItem("chef_token", response.data.token)
          localStorage.setItem("chef_role", response.data.role)
          localStorage.setItem("chef_name", response.data.name)
          localStorage.setItem("chef_restaurant", response.data.restaurant || "Chưa cập nhật")
          
          // Hiển thị thông báo thành công
          if (currState === "Sign Up") {
            alert("Đăng ký thành công! Chào mừng bạn đến với hệ thống.")
          }
        } else {
          alert("Chỉ có đầu bếp mới có thể truy cập hệ thống này!")
        }
      } else {
        alert(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại!")
      }
    } catch (error) {
      console.error("Login/Register error:", error)
      
      // Xử lý các loại lỗi khác nhau
      if (error.response) {
        // Server trả về lỗi
        const errorMessage = error.response.data?.message || "Lỗi từ máy chủ. Vui lòng thử lại!"
        alert(errorMessage)
      } else if (error.request) {
        // Không có phản hồi từ server
        alert("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng!")
      } else {
        // Lỗi khác
        alert("Đã xảy ra lỗi. Vui lòng thử lại!")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='chef-login-popup'>
      <form onSubmit={onLogin} className="chef-login-popup-container">
        <div className="chef-login-popup-title">
          <h2>{currState} - Hệ thống đầu bếp</h2>
        </div>
        
        <div className="chef-login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input 
                name='name' 
                onChange={onChangeHandler} 
                value={data.name} 
                type="text" 
                placeholder='Tên của bạn' 
                required 
              />
              <input 
                name='restaurant' 
                onChange={onChangeHandler} 
                value={data.restaurant} 
                type="text" 
                placeholder='Tên nhà hàng' 
                required 
              />
            </>
          )}
          <input 
            name='email' 
            onChange={onChangeHandler} 
            value={data.email} 
            type="email" 
            placeholder='Email' 
            required 
          />
          <input 
            name='password' 
            onChange={onChangeHandler} 
            value={data.password} 
            type="password" 
            placeholder='Mật khẩu' 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              {currState === "Sign Up" ? "Đang tạo tài khoản..." : "Đang đăng nhập..."}
            </>
          ) : (
            currState === "Sign Up" ? "Tạo tài khoản" : "Đăng nhập"
          )}
        </button>
        
        <div className="chef-login-popup-condition">
          <input type="checkbox" required />
          <p>Bằng việc tiếp tục, tôi đồng ý với điều khoản sử dụng & chính sách bảo mật.</p>
        </div>
        
        {currState === "Login" 
          ? <p>Tạo tài khoản mới? <span 
              onClick={() => !isLoading && setCurrState("Sign Up")}
              style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >Đăng ký tại đây</span></p>
          : <p>Đã có tài khoản? <span 
              onClick={() => !isLoading && setCurrState("Login")}
              style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >Đăng nhập tại đây</span></p>
        }
      </form>
    </div>
  )
}

export default ChefLogin
