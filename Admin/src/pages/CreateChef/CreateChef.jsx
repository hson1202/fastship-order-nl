import React, { useState } from 'react'
import './CreateChef.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ENDPOINTS } from '../../config/config'

const CreateChef = ({ url, token }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    restaurant: ""
  })
  const [submitting, setSubmitting] = useState(false)

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, {
        ...data,
        role: "chef"
      }, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success("Tài khoản chef đã được tạo thành công!")
        setData({
          name: "",
          email: "",
          password: "",
          restaurant: ""
        })
      } else {
        toast.error(response.data.message || "Lỗi khi tạo tài khoản")
      }
    } catch (error) {
      console.error("Error creating chef:", error)
      toast.error("Lỗi khi tạo tài khoản chef")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='create-chef'>
      <div className="create-chef-header">
        <h1>👨‍🍳 Tạo Tài Khoản Chef</h1>
        <p>Tạo tài khoản mới cho đầu bếp để họ có thể đặt nguyên liệu</p>
      </div>

      <form onSubmit={onSubmitHandler} className="chef-form">
        <div className="form-section">
          <h2>Thông tin cá nhân</h2>
          
          <div className="form-group">
            <label>Tên đầy đủ *</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Nhập tên đầy đủ của chef"
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="chef@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu *</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
              minLength="8"
              required
            />
          </div>

          <div className="form-group">
            <label>Tên nhà hàng</label>
            <input
              type="text"
              name="restaurant"
              value={data.restaurant}
              onChange={onChangeHandler}
              placeholder="Tên nhà hàng hoặc cơ sở làm việc"
            />
          </div>
        </div>

        <div className="chef-permissions">
          <h2>Quyền hạn sẽ được cấp</h2>
          <div className="permissions-list">
            <div className="permission-item">
              ✅ Đặt yêu cầu nguyên liệu
            </div>
            <div className="permission-item">
              ✅ Xem danh sách yêu cầu của mình
            </div>
            <div className="permission-item">
              ✅ Hủy yêu cầu đang chờ duyệt
            </div>
            <div className="permission-item">
              ❌ Không thể xem yêu cầu của chef khác
            </div>
            <div className="permission-item">
              ❌ Không có quyền admin
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? "Đang tạo..." : "Tạo tài khoản Chef"}
          </button>
          
          <button 
            type="button" 
            className="reset-btn"
            onClick={() => setData({
              name: "",
              email: "",
              password: "",
              restaurant: ""
            })}
          >
            Xóa form
          </button>
        </div>
      </form>

      <div className="chef-info-notice">
        <h3>📋 Lưu ý quan trọng</h3>
        <ul>
          <li>Chef sẽ nhận được email và mật khẩu để đăng nhập</li>
          <li>Chef chỉ có thể truy cập chức năng đặt nguyên liệu</li>
          <li>Tất cả yêu cầu cần được admin duyệt</li>
          <li>Email phải là duy nhất trong hệ thống</li>
          <li>Mật khẩu phải có ít nhất 8 ký tự</li>
        </ul>
      </div>
    </div>
  )
}

export default CreateChef
