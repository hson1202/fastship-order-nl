import React, { useState } from 'react'
import './CreateIngredientRequest.css'
import axios from 'axios'
import { API_ENDPOINTS } from '../../config/config'

const CreateIngredientRequest = () => {
  const [data, setData] = useState({
    ingredientName: "",
    quantity: "",
    unit: "",
    customUnit: "",
    description: "",
    neededByDate: ""
  })
  const [useCustomUnit, setUseCustomUnit] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Set minimum date to tomorrow
  React.useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setData(prev => ({
      ...prev,
      neededByDate: tomorrow.toISOString().split('T')[0]
    }))
  }, [])

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    
    if (name === 'unit') {
      if (value === 'custom') {
        setUseCustomUnit(true)
        setData(data => ({ ...data, unit: '', customUnit: '' }))
      } else {
        setUseCustomUnit(false)
        setData(data => ({ ...data, [name]: value, customUnit: '' }))
      }
    } else {
      setData(data => ({ ...data, [name]: value }))
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    // Prepare data with correct unit
    const submitData = {
      ...data,
      unit: useCustomUnit ? data.customUnit : data.unit
    }

    try {
      const token = localStorage.getItem("chef_token")
      const response = await axios.post(API_ENDPOINTS.INGREDIENT_REQUEST_CREATE, submitData, {
        headers: { token }
      })

      if (response.data.success) {
        alert("Yêu cầu nguyên liệu đã được gửi thành công!")
        setData({
          ingredientName: "",
          quantity: "",
          unit: "",
          customUnit: "",
          description: "",
          neededByDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
        })
        setUseCustomUnit(false)
        // Redirect to requests page
        window.location.href = "/my-requests"
      } else {
        alert(response.data.message || "Lỗi khi tạo yêu cầu")
      }
    } catch (error) {
      console.error("Error creating request:", error)
      alert("Lỗi khi gửi yêu cầu")
    } finally {
      setSubmitting(false)
    }
  }

  const commonUnits = [
    "kg", "gram", "lít", "ml", "bó", "cái", "thùng", "túi", "gói", "lon", "chai", "hộp", "tấn"
  ]

  return (
    <div className='create-ingredient-request'>
      <div className="request-header">
        <h1>Tạo yêu cầu nhập nguyên liệu</h1>
        <p>Điền thông tin nguyên liệu cần nhập. Hệ thống sẽ tự động đính kèm thông tin của bạn.</p>
      </div>
      
      <form onSubmit={onSubmitHandler} className="request-form">
        <div className="form-section">
          <h2>Thông tin nguyên liệu</h2>
          
          <div className="form-group">
            <label>Tên nguyên liệu *</label>
            <input
              type="text"
              name="ingredientName"
              value={data.ingredientName}
              onChange={onChangeHandler}
              placeholder="Nhập tên nguyên liệu cần đặt"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Số lượng *</label>
              <input
                type="number"
                name="quantity"
                value={data.quantity}
                onChange={onChangeHandler}
                placeholder="0"
                min="0.1"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label>Đơn vị *</label>
              <select
                name="unit"
                value={useCustomUnit ? 'custom' : data.unit}
                onChange={onChangeHandler}
                required
              >
                <option value="">Chọn đơn vị</option>
                {commonUnits.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
                <option value="custom">🔧 Đơn vị khác (tự nhập)</option>
              </select>
              
              {useCustomUnit && (
                <input
                  type="text"
                  name="customUnit"
                  value={data.customUnit}
                  onChange={onChangeHandler}
                  placeholder="Nhập đơn vị của bạn (vd: hũ, lọ, bình...)"
                  className="custom-unit-input"
                  required
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Ngày cần hàng *</label>
            <input
              type="date"
              name="neededByDate"
              value={data.neededByDate}
              onChange={onChangeHandler}
              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Ghi chú cho nhà cung cấp</label>
            <textarea
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              placeholder="Mô tả thêm về yêu cầu chất lượng, đóng gói, giao hàng..."
              rows="4"
            />
          </div>
        </div>

        <div className="chef-info-section">
          <h2>Thông tin sẽ được đính kèm tự động</h2>
          <div className="info-items">
            <div className="info-item">
              <span className="info-label">Tên đầu bếp:</span>
              <span className="info-value">{localStorage.getItem("chef_name") || "Đang tải..."}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Vai trò:</span>
              <span className="info-value">Chef</span>
            </div>
            <div className="info-item">
              <span className="info-label">Nhà hàng:</span>
              <span className="info-value">{localStorage.getItem("chef_restaurant") || "Chưa cập nhật"}</span>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
          
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => window.location.href = "/my-requests"}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateIngredientRequest
