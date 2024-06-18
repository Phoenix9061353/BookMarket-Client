/* eslint-disable no-restricted-globals */
import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../../service/authService';

////////////////////////////////////////////////////////
const Nav = (props) => {
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

  ////////////////////////////////////////
  return (
    <>
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
                <NavLink
                  className='nav-link'
                  aria-current='page'
                  to='/'
                  id='Home'
                >
                  Home
                </NavLink>
              </li>
              {!currentUser && (
                <>
                  <li className='nav-item'>
                    <NavLink
                      className='nav-link'
                      aria-current='page'
                      to='/signup'
                      id='signup'
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      className='nav-link'
                      aria-current='page'
                      to='/login'
                      id='login'
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              {currentUser && (
                <>
                  <li className='nav-item'>
                    <NavLink
                      className='nav-link'
                      aria-current='page'
                      to='/profile'
                      id='profile'
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      className='nav-link'
                      aria-current='page'
                      to='/my-books'
                      id='my-books'
                    >
                      My Books
                    </NavLink>
                  </li>
                </>
              )}
              {currentUser && currentUser.user.role === 'author' && (
                <>
                  <li className='nav-item'>
                    <NavLink
                      className='nav-link'
                      aria-current='page'
                      to='/post-book'
                      id='post-book'
                    >
                      Post Book
                    </NavLink>
                  </li>
                </>
              )}
              {currentUser && currentUser.user.role === 'user' && (
                <li className='nav-item'>
                  <NavLink
                    className='nav-link'
                    aria-current='page'
                    to='/my-reviews'
                    id='my-reviews'
                  >
                    My Reviews
                  </NavLink>
                </li>
              )}
              <li className='nav-item'>
                <NavLink
                  className='nav-link'
                  aria-current='page'
                  to='/search'
                  id='search'
                >
                  Search Book
                </NavLink>
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
                  <NavLink onClick={handleLogout} className='nav-link' to='/'>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
