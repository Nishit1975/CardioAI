import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === 'ECONNABORTED' ? 'Request timed out.' : null) ||
      (error.code === 'ERR_NETWORK' ? 'Cannot connect to server. Make sure Flask is running on port 5000.' : null) ||
      'An unexpected error occurred.';
    return Promise.reject({ ...error, userMessage: message });
  }
);

export const predictRisk = async (formData) => {
  const payload = {
    age: Number(formData.age),
    gender: Number(formData.gender),
    height: Number(formData.height),
    weight: Number(formData.weight),
    ap_hi: Number(formData.ap_hi),
    ap_lo: Number(formData.ap_lo),
  };
  const response = await apiClient.post('/predict', payload);
  return response.data;
};

export default apiClient;