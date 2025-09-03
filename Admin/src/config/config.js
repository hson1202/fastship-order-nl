// API Configuration for FASTSHIP ORDER NL Admin
const config = {
  // Backend API URL - sẽ được override bởi environment variable khi deploy
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  
  // API Endpoints
  endpoints: {
    // User Authentication & Management
    LOGIN: '/api/user/login',
    REGISTER: '/api/user/register',
    
    // Ingredient Requests Management
    INGREDIENT_REQUEST_ALL: '/api/ingredient-request/all',
    INGREDIENT_REQUEST_UPDATE_STATUS: '/api/ingredient-request/updatestatus',
    
    // Ingredients Management
    INGREDIENT_LIST: '/api/ingredient/list',
    INGREDIENT_ADD: '/api/ingredient/add',
    INGREDIENT_REMOVE: '/api/ingredient/remove',
    
    // Order Management (if needed)
    INGREDIENT_ORDER_ALL: '/api/ingredient-order/all',
    INGREDIENT_ORDER_UPDATE: '/api/ingredient-order/update',
  }
}

// Helper function để tạo full URL
export const getApiUrl = (endpoint) => {
  return `${config.API_URL}${endpoint}`
}

// Export individual endpoints với full URL
export const API_ENDPOINTS = {
  LOGIN: getApiUrl(config.endpoints.LOGIN),
  REGISTER: getApiUrl(config.endpoints.REGISTER),
  INGREDIENT_REQUEST_ALL: getApiUrl(config.endpoints.INGREDIENT_REQUEST_ALL),
  INGREDIENT_REQUEST_UPDATE_STATUS: getApiUrl(config.endpoints.INGREDIENT_REQUEST_UPDATE_STATUS),
  INGREDIENT_LIST: getApiUrl(config.endpoints.INGREDIENT_LIST),
  INGREDIENT_ADD: getApiUrl(config.endpoints.INGREDIENT_ADD),
  INGREDIENT_REMOVE: (id) => getApiUrl(`${config.endpoints.INGREDIENT_REMOVE}/${id}`),
  INGREDIENT_ORDER_ALL: getApiUrl(config.endpoints.INGREDIENT_ORDER_ALL),
  INGREDIENT_ORDER_UPDATE: getApiUrl(config.endpoints.INGREDIENT_ORDER_UPDATE),
}

export default config
