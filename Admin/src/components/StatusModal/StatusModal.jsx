import React, { useState } from 'react'
import './StatusModal.css'

const StatusModal = ({ isOpen, onClose, onSubmit, status, requestData }) => {
  const [formData, setFormData] = useState({
    rejectionReason: '',
    estimatedPrice: '',
    supplier: '',
    adminNotes: '',
    actualPrice: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (status === 'rejected' && !formData.rejectionReason.trim()) {
      alert('Vui lòng nhập lý do từ chối')
      return
    }
    
    if (status === 'approved' && (!formData.estimatedPrice || formData.estimatedPrice <= 0)) {
      alert('Vui lòng nhập giá ước tính hợp lệ')
      return
    }
    
    if (status === 'completed' && (!formData.actualPrice || formData.actualPrice <= 0)) {
      alert('Vui lòng nhập giá thực tế hợp lệ')
      return
    }

    onSubmit(formData)
    setFormData({
      rejectionReason: '',
      estimatedPrice: '',
      supplier: '',
      adminNotes: '',
      actualPrice: ''
    })
  }

  const handleClose = () => {
    setFormData({
      rejectionReason: '',
      estimatedPrice: '',
      supplier: '',
      adminNotes: '',
      actualPrice: ''
    })
    onClose()
  }

  if (!isOpen) return null

  const getModalTitle = () => {
    switch (status) {
      case 'approved': return '✅ Duyệt yêu cầu'
      case 'rejected': return '❌ Từ chối yêu cầu'
      case 'completed': return '🎉 Hoàn thành yêu cầu'
      default: return 'Cập nhật trạng thái'
    }
  }

  const getModalColor = () => {
    switch (status) {
      case 'approved': return 'modal-success'
      case 'rejected': return 'modal-danger'
      case 'completed': return 'modal-info'
      default: return ''
    }
  }

  return (
    <div className="modal-overlay">
      <div className={`status-modal ${getModalColor()}`}>
        <div className="modal-header">
          <h2>{getModalTitle()}</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="request-summary">
            <h3>📋 Thông tin yêu cầu</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Nguyên liệu:</span>
                <span className="value">{requestData?.ingredientName}</span>
              </div>
              <div className="summary-item">
                <span className="label">Số lượng:</span>
                <span className="value">{requestData?.quantity} {requestData?.unit}</span>
              </div>
              <div className="summary-item">
                <span className="label">Chef:</span>
                <span className="value">{requestData?.chefName}</span>
              </div>
              <div className="summary-item">
                <span className="label">Ngày tạo:</span>
                <span className="value">
                  {requestData?.createdAt ? new Date(requestData.createdAt).toLocaleDateString('vi-VN') : ''}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="status-form">
            {status === 'rejected' && (
              <div className="form-group">
                <label>Lý do từ chối *</label>
                <textarea
                  name="rejectionReason"
                  value={formData.rejectionReason}
                  onChange={handleChange}
                  placeholder="Nhập lý do tại sao yêu cầu này bị từ chối..."
                  rows="3"
                  required
                />
              </div>
            )}

            {status === 'approved' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Giá ước tính (VNĐ) *</label>
                    <input
                      type="number"
                      name="estimatedPrice"
                      value={formData.estimatedPrice}
                      onChange={handleChange}
                      placeholder="0"
                      min="1"
                      step="1000"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nhà cung cấp</label>
                    <input
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleChange}
                      placeholder="Tên nhà cung cấp"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Ghi chú</label>
                  <textarea
                    name="adminNotes"
                    value={formData.adminNotes}
                    onChange={handleChange}
                    placeholder="Ghi chú thêm về việc duyệt này..."
                    rows="2"
                  />
                </div>
              </>
            )}

            {status === 'completed' && (
              <>
                <div className="form-group">
                  <label>Giá thực tế (VNĐ) *</label>
                  <input
                    type="number"
                    name="actualPrice"
                    value={formData.actualPrice}
                    onChange={handleChange}
                    placeholder="0"
                    min="1"
                    step="1000"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ghi chú hoàn thành</label>
                  <textarea
                    name="adminNotes"
                    value={formData.adminNotes}
                    onChange={handleChange}
                    placeholder="Ghi chú về việc hoàn thành đơn hàng..."
                    rows="2"
                  />
                </div>
              </>
            )}

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={handleClose}>
                Hủy
              </button>
              <button type="submit" className="submit-btn">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StatusModal
