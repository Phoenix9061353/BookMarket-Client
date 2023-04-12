import axios from 'axios';

const API_URL = 'https://bookmarket-server.onrender.com/bookapi/v1/auth';

class AuthService {
  login(email, password) {
    return axios.post(API_URL + '/login', { email, password });
  }
  logout() {
    localStorage.removeItem('user');
  }
  signup(data) {
    return axios.post(API_URL + '/signup', data);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
