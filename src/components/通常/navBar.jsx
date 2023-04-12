import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../service/authService';
const nav = (props) => {
  const { currentUser, setCurrentUser, setBook } = props;
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setBook({
      _id: '123456789',
      name: 'default name',
      summary: 'test',
      description: 'testtest',
      author: {
        name: 'test author',
      },
      type: '其他',
      price: 100,
    });
  };
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light sticky-top'>
        <div className='container-fluid'>
          <span className='navbar-brand mb-0 h1'>BookMarket</span>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarS'
            aria-controls='navbarS'
            aria-expanded='false'
            aria-haspopup='true'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarS'>
            <ul className='nav navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link active' aria-current='page' to='/'>
                  Home
                </Link>
              </li>
              {!currentUser && (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' aria-current='page' to='/signup'>
                      Sign Up
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' aria-current='page' to='/login'>
                      Login
                    </Link>
                  </li>
                </>
              )}
              {currentUser && (
                <>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/profile'
                    >
                      Profile
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/my-books'
                    >
                      My Books
                    </Link>
                  </li>
                </>
              )}
              {currentUser && currentUser.user.role === 'author' && (
                <>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/post-book'
                    >
                      Post Book
                    </Link>
                  </li>
                </>
              )}
              {currentUser && currentUser.user.role === 'user' && (
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    aria-current='page'
                    to='/my-reviews'
                  >
                    My Reviews
                  </Link>
                </li>
              )}
              <li className='nav-item'>
                <Link className='nav-link' aria-current='page' to='/search'>
                  Search Book
                </Link>
              </li>
            </ul>
          </div>
          {currentUser && (
            <div
              className='collapse navbar-collapse justify-content-end'
              id='navbarS'
            >
              <ul className='nav navbar-nav d-flex'>
                <li className='nav-item'>
                  <Link onClick={handleLogout} className='nav-link' to='/'>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default nav;
