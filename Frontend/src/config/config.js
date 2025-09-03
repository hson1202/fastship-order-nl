// API Configuration for FASTSHIP ORDER NL
const config = {
  // Backend API URL - sẽ được override bởi environment variable khi deploy
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  
  // API Endpoints
  endpoints: {
    // User Authentication
    LOGIN: '/api/user/login',
    REGISTER: '/api/user/register',
    
    // Ingredient Requests
    INGREDIENT_REQUEST_CREATE: '/api/ingredient-request/create',
    INGREDIENT_REQUEST_CHEF: '/api/ingredient-request/chef',
    INGREDIENT_REQUEST_UPDATE: '/api/ingredient-request/update',
    INGREDIENT_REQUEST_CANCEL: '/api/ingredient-request/cancel',
    
    // Ingredients
    INGREDIENT_LIST: '/api/ingredient/list',
    
    // Order related (if needed in future)
    INGREDIENT_ORDER_CHEF: '/api/ingredient-order/chef',
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
  INGREDIENT_REQUEST_CREATE: getApiUrl(config.endpoints.INGREDIENT_REQUEST_CREATE),
  INGREDIENT_REQUEST_CHEF: getApiUrl(config.endpoints.INGREDIENT_REQUEST_CHEF),
  INGREDIENT_REQUEST_UPDATE: (id) => getApiUrl(`${config.endpoints.INGREDIENT_REQUEST_UPDATE}/${id}`),
  INGREDIENT_REQUEST_CANCEL: (id) => getApiUrl(`${config.endpoints.INGREDIENT_REQUEST_CANCEL}/${id}`),
  INGREDIENT_LIST: getApiUrl(config.endpoints.INGREDIENT_LIST),
  INGREDIENT_ORDER_CHEF: getApiUrl(config.endpoints.INGREDIENT_ORDER_CHEF),
}

export default config
