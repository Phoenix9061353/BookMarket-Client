import axios from 'axios';
import { URL } from './URL';

const API_URL = `${URL}/bookings`;

class BookingService {
  createBooking(book_id) {
    let token = '';
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    }

    return axios.post(
      API_URL + '/' + book_id,
      {},
      { headers: { Authorization: token } }
    );
  }
  getUserBookings() {
    let token = '';
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    }

    return axios.get(API_URL + '/user-books', {
      headers: {
        Authorization: token,
      },
    });
  }

  checkBooking(id) {
    let token = '';
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    }

    return axios.get(API_URL + '/check/' + id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new BookingService();
