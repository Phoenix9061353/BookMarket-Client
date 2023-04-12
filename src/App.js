import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthService from './service/authService';

import NavBar from './components/通常/navBar';
import HomePage from './components/通常/homePage';
import SignupPage from './components/通常/signupPage';
import LoginPage from './components/通常/loginPage';
import SearchBook from './components/通常/searchBook';

import ProfilePage from './components/profile';
import MyBookPage from './components/myBook';

import PostBook from './components/author/postBook';
import UpdateBook from './components/author/updateBook';

import MyReview from './components/user/myReview';
import PostReview from './components/user/postReview';
import Updatereview from './components/user/updateReview';

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [book, setBook] = useState({
    _id: '123456789',
    name: 'default name',
    summary: 'test',
    description: 'testtest',
    author: {
      name: 'test author',
    },
    reviews: [],
    type: '其他',
    price: 100,
  });
  let [review, setReview] = useState({
    _id: 123456789,
    name: 'testtest',
    rating: 4.5,
    review: 'testtestetstets',
    user: 123456677,
    book: 1234567777,
  });
  return (
    <div>
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setBook={setBook}
      />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route
          exact
          path='/signup'
          element={<SignupPage setCurrentUser={setCurrentUser} />}
        />
        <Route
          exact
          path='/login'
          element={<LoginPage setCurrentUser={setCurrentUser} />}
        />
        <Route
          exact
          path='/profile'
          element={
            <ProfilePage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          exact
          path='/my-books'
          element={
            <MyBookPage
              currentUser={currentUser}
              book={book}
              setBook={setBook}
            />
          }
        />
        <Route
          exact
          path='/post-book'
          element={<PostBook currentUser={currentUser} />}
        />
        <Route
          exact
          path='/search'
          element={
            <SearchBook
              currentUser={currentUser}
              book={book}
              setBook={setBook}
            />
          }
        />
        <Route
          exact
          path='/update-book'
          element={<UpdateBook currentUser={currentUser} book={book} />}
        />
        <Route
          exact
          path='/my-reviews'
          element={
            <MyReview
              currentUser={currentUser}
              review={review}
              setReview={setReview}
            />
          }
        />
        <Route
          exact
          path='/post-review'
          element={<PostReview currentUser={currentUser} book={book} />}
        />
        <Route
          exact
          path='/update-review'
          element={<Updatereview currentUser={currentUser} review={review} />}
        />
      </Routes>
    </div>
  );
}

export default App;
