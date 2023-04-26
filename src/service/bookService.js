import axios from 'axios';
import { URL } from './URL';
const API_URL = `${URL}/books`;

class BookService {
  getAuthorBooks() {
    let token = '';
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    }
    return axios.get(API_URL + '/author-books', {
      headers: {
        Authorization: token,
      },
    });
  }

  getSearchBook(input) {
    return axios.get(API_URL + '/filterFind/' + input);
  }

  getOneBook(id) {
    return axios.get(API_URL + '/' + id);
  }

  createOneBook(data) {
    let token = '';
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    }
    return axios.post(API_URL + '/', data, {
      headers: {
        Authorization: token,
      },
    });
  }

  updateBook(id, data) {
    let token = '';
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    }
    return axios.patch(API_URL + '/' + id, data, {
      headers: {
        Authorization: token,
      },
    });
  }

  deleteOneBook(id) {
    let token = '';
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    }
    return axios.delete(API_URL + '/' + id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new BookService();
