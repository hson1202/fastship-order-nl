import React, { useEffect, useState } from 'react'
import './ViewMyRequests.css'
import axios from 'axios'
import { API_ENDPOINTS } from '../../config/config'

const ViewMyRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("chef_token")
      const response = await axios.get(API_ENDPOINTS.INGREDIENT_REQUEST_CHEF, {
        headers: { token }
      })
      
      if (response.data.success) {
        setRequests(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching requests:", error)
      alert("Lỗi khi tải danh sách yêu cầu")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ duyệt'
      case 'approved': return 'Đã duyệt'
      case 'rejected': return 'Bị từ chối'
      case 'completed': return 'Hoàn thành'
      default: return status
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'approved': return 'status-approved'
      case 'rejected': return 'status-rejected'
      case 'completed': return 'status-completed'
      default: return ''
    }
  }

  const cancelRequest = async (requestId) => {
    if (!confirm("Bạn có chắc chắn muốn hủy yêu cầu này?")) {
      return
    }

    try {
      const token = localStorage.getItem("chef_token")
      const response = await axios.delete(API_ENDPOINTS.INGREDIENT_REQUEST_CANCEL(requestId), {
        headers: { token }
      })

      if (response.data.success) {
        alert("Đã hủy yêu cầu thành công")
        fetchRequests() // Refresh the list
      } else {
        alert(response.data.message || "Lỗi khi hủy yêu cầu")
      }
    } catch (error) {
      console.error("Error canceling request:", error)
      alert("Lỗi khi hủy yêu cầu")
    }
  }

  if (loading) {
    return <div className="loading">Đang tải...</div>
  }

  return (
    <div className='view-my-requests'>
      <div className="requests-header">
        <h1>📋 Yêu Cầu Nguyên Liệu Của Tôi</h1>
        <p>Xem tất cả các yêu cầu nguyên liệu bạn đã gửi</p>
      </div>

      {requests.length === 0 ? (
        <div className="no-requests">
          <div className="no-requests-icon">📦</div>
          <h3>Chưa có yêu cầu nào</h3>
          <p>Bạn chưa tạo yêu cầu nguyên liệu nào.</p>
          <button 
            className="create-request-btn"
            onClick={() => window.location.href = '/'}
          >
            Tạo yêu cầu đầu tiên
          </button>
        </div>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request._id} className="request-card">
              <div className="request-header">
                <div className="request-info">
                  <h3>{request.ingredientName}</h3>
                  <span className={`status ${getStatusClass(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
                <div className="request-date">
                  {new Date(request.createdAt).toLocaleDateString('vi-VN')}
                </div>
              </div>

              <div className="request-details">
                <div className="detail-row">
                  <span className="label">Số lượng:</span>
                  <span className="value">{request.quantity} {request.unit}</span>
                </div>
                
                {request.neededByDate && (
                  <div className="detail-row">
                    <span className="label">Cần trước:</span>
                    <span className="value">
                      {new Date(request.neededByDate).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                )}

                {request.description && (
                  <div className="detail-row">
                    <span className="label">Ghi chú:</span>
                    <span className="value">{request.description}</span>
                  </div>
                )}

                {request.adminNotes && (
                  <div className="detail-row admin-notes">
                    <span className="label">Ghi chú từ Admin:</span>
                    <span className="value">{request.adminNotes}</span>
                  </div>
                )}
              </div>

              <div className="request-actions">
                {request.status === 'pending' && (
                  <button 
                    className="cancel-btn"
                    onClick={() => cancelRequest(request._id)}
                  >
                    Hủy yêu cầu
                  </button>
                )}
                
                {request.status === 'rejected' && (
                  <button 
                    className="retry-btn"
                    onClick={() => window.location.href = '/'}
                  >
                    Tạo yêu cầu mới
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewMyRequests
