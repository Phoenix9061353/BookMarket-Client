import axios from 'axios';

const API_URL = 'https://bookmarket-server.onrender.com/bookapi/v1/users';

class UserService {
  updateUserData(id, data) {
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

  updateUserPassword(data) {
    let token = '';
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    }

    return axios.patch(API_URL + '/updateMyPass', data, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new UserService();
