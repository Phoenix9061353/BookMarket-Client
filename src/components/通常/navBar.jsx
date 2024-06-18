/* eslint-disable no-restricted-globals */
// import React, { useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../service/authService';
// import { linkSet } from '../tool/select';

////////////////////////////////////////////////////////
const Nav = (props) => {
  const { currentUser, setCurrentUser, setBook, preLink, setPreLink } = props;

  const handleLogout = () => {
    // if (location.hash === '#/') {
    //   linkSet('#Home', setPreLink);
    // } else {
    //   linkSet(
    //     '#Home',
    //     setPreLink,
    //     document.querySelector('#' + location.hash.slice(2))
    //   );
    // }
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

  const handleNav = (e) => {
    let target = e.target.closest('.nav-link');

    setPreLink(target);
    if (preLink) {
      preLink.classList.remove('active');
    }
    target.classList.add('active');
  };

  //useEffect
  // useEffect(() => {
  //   if (location.hash === '#/' || location.hash === '') {
  //     linkSet('#Home', setPreLink);
  //   } else if (document.querySelector('#' + location.hash.slice(2))) {
  //     linkSet('#' + location.hash.slice(2), setPreLink);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
              <li className='nav-item' onClick={handleNav}>
                <Link className='nav-link' aria-current='page' to='/' id='Home'>
                  Home
                </Link>
              </li>
              {!currentUser && (
                <>
                  <li className='nav-item' onClick={handleNav}>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/signup'
                      id='signup'
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className='nav-item' onClick={handleNav}>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/login'
                      id='login'
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
              {currentUser && (
                <>
                  <li className='nav-item' onClick={handleNav}>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/profile'
                      id='profile'
                    >
                      Profile
                    </Link>
                  </li>
                  <li className='nav-item' onClick={handleNav}>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/my-books'
                      id='my-books'
                    >
                      My Books
                    </Link>
                  </li>
                </>
              )}
              {currentUser && currentUser.user.role === 'author' && (
                <>
                  <li className='nav-item' onClick={handleNav}>
                    <Link
                      className='nav-link'
                      aria-current='page'
                      to='/post-book'
                      id='post-book'
                    >
                      Post Book
                    </Link>
                  </li>
                </>
              )}
              {currentUser && currentUser.user.role === 'user' && (
                <li className='nav-item' onClick={handleNav}>
                  <Link
                    className='nav-link'
                    aria-current='page'
                    to='/my-reviews'
                    id='my-reviews'
                  >
                    My Reviews
                  </Link>
                </li>
              )}
              <li className='nav-item' onClick={handleNav}>
                <Link
                  className='nav-link'
                  aria-current='page'
                  to='/search'
                  id='search'
                >
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
    </>
  );
};

export default Nav;
