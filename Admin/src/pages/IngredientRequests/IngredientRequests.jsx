import React, { useEffect, useState } from 'react'
import './IngredientRequests.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import StatusModal from '../../components/StatusModal/StatusModal'
import { API_ENDPOINTS } from '../../config/config'

const IngredientRequests = ({ url, token }) => {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchAllRequests = async () => {
    const response = await axios.get(API_ENDPOINTS.INGREDIENT_REQUEST_ALL, {
      headers: { token }
    });
    if (response.data.success) {
      setRequests(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, requestId) => {
    const status = event.target.value;
    
    if (status === 'pending') return; // No action needed for pending
    
    const request = requests.find(r => r._id === requestId);
    setSelectedRequest(request);
    setSelectedStatus(status);
    setIsModalOpen(true);
  }

  const handleModalSubmit = async (formData) => {
    const response = await axios.post(API_ENDPOINTS.INGREDIENT_REQUEST_UPDATE_STATUS, {
      requestId: selectedRequest._id,
      status: selectedStatus,
      adminNotes: formData.adminNotes,
      rejectionReason: formData.rejectionReason,
      estimatedPrice: parseFloat(formData.estimatedPrice) || 0,
      supplier: formData.supplier,
      actualPrice: parseFloat(formData.actualPrice) || 0
    }, {
      headers: { token }
    });

    if (response.data.success) {
      await fetchAllRequests();
      toast.success("Cập nhật trạng thái thành công");
      setIsModalOpen(false);
      setSelectedRequest(null);
      setSelectedStatus('');
    }
    else {
      toast.error("Lỗi khi cập nhật trạng thái")
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    setSelectedStatus('');
  }

  useEffect(() => {
    fetchAllRequests();
  }, [])

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'approved': return 'status-approved'
      case 'rejected': return 'status-rejected'
      case 'completed': return 'status-completed'
      default: return ''
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ duyệt'
      case 'approved': return 'Đã duyệt'
      case 'rejected': return 'Từ chối'
      case 'completed': return 'Hoàn thành'
      default: return status
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className='ingredient-requests add'>
      <h3>Yêu cầu nguyên liệu từ Chef</h3>
      <div className="request-list">
        {requests.map((request, index) => (
          <div key={index} className='request'>
            <img src={assets.parcel_icon} alt="" />
            <div className="request-info">
              <div className="request-header">
                <p className="request-id">Yêu cầu #{request._id.slice(-8)}</p>
                <p className="chef-info">Chef: {request.chefName} - {request.restaurant}</p>
                <p className="request-date">Yêu cầu: {formatDate(request.requestDate)}</p>
                <p className="needed-date">Cần trước: {new Date(request.neededByDate).toLocaleDateString('vi-VN')}</p>
              </div>
              
              <div className="ingredient-info">
                <h4>{request.ingredientName}</h4>
                <div className="ingredient-details">
                  <span className="quantity">{request.quantity} {request.unit}</span>
                  {request.description && (
                    <span className="description">Ghi chú: {request.description}</span>
                  )}
                </div>
              </div>

              {request.estimatedPrice > 0 && (
                <div className="price-info">
                  <strong>Giá ước tính:</strong> {request.estimatedPrice.toLocaleString()} VNĐ
                  {request.supplier && <span> - Nhà cung cấp: {request.supplier}</span>}
                </div>
              )}

              {request.actualPrice > 0 && (
                <div className="price-info actual">
                  <strong>Giá thực tế:</strong> {request.actualPrice.toLocaleString()} VNĐ
                </div>
              )}

              {request.adminNotes && (
                <div className="admin-notes">
                  <strong>Ghi chú admin:</strong> {request.adminNotes}
                </div>
              )}

              {request.rejectionReason && (
                <div className="rejection-reason">
                  <strong>Lý do từ chối:</strong> {request.rejectionReason}
                </div>
              )}

              {request.approvedBy && (
                <div className="approval-info">
                  <strong>Được duyệt bởi:</strong> {request.approvedBy} vào {formatDate(request.approvedDate)}
                </div>
              )}
            </div>
            
            <div className="request-status">
              <p className={`status ${getStatusClass(request.status)}`}>
                {getStatusText(request.status)}
              </p>
              <select onChange={(event) => statusHandler(event, request._id)} value={request.status}>
                <option value="pending">Chờ duyệt</option>
                <option value="approved">Duyệt</option>
                <option value="rejected">Từ chối</option>
                <option value="completed">Hoàn thành</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      
      <StatusModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        status={selectedStatus}
        requestData={selectedRequest}
      />
    </div>
  )
}

export default IngredientRequests
