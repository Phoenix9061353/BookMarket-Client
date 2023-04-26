import axios from 'axios';
import { URL } from './URL';

const API_URL = `${URL}/auth`;

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
