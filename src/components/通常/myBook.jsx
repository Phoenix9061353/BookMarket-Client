import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookService from '../../service/bookService';
import BookingService from '../../service/bookingService';
import Loading from '../tool/Loading';
import Warning from '../tool/Warning';
import { linkSet } from '../tool/select';

const MyBookPage = (props) => {
  const { currentUser, book, setBook, preLink, setPreLink } = props;
  const navigate = useNavigate();
  document.title = 'BookMarket | My Book';

  let arrD = [];
  if (book.description.includes('\n')) {
    arrD = book.description.split('\n');
  }
  let arrS = [];
  if (book.summary.includes('\n')) {
    arrS = book.summary.split('\n');
  }

  //state
  let [msg, setMsg] = useState('');
  let [books, setBooks] = useState('');
  let [check, setCheck] = useState(0);
  //handler
  const getBooks = async () => {
    setMsg('');
    if (!currentUser) {
      setCheck(2);
      return setMsg('🚨 請先登入後再拜訪此頁面！🚨');
    }
    if (currentUser.user.role === 'author') {
      try {
        const result = await BookService.getAuthorBooks();
        if (result.data.data.books.length !== 0) {
          setCheck(1);
          return setBooks(result.data.data.books);
        }
      } catch (err) {
        setMsg(err.response.data.message);
      }
    }
    if (currentUser.user.role === 'user') {
      try {
        const result = await BookingService.getUserBookings();
        let arrR = [];
        if (result.data.data.bookings.length !== 0) {
          result.data.data.bookings.map((el) => arrR.push(el.book));
          setCheck(1);
          return setBooks(arrR);
        }
      } catch (err) {
        setMsg(err.response.data.message);
      }
    }
    setCheck(2);
  };
  const getSpeciedBook = (e) => {
    const result = books.find((el) => el._id === e.target.id);
    setBook(result);
  };

  //useEffect
  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //////////////////////////////////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      {msg && <Warning message={msg} colorType={'danger'} />}
      {currentUser && books.length === 0 && check === 2 && (
        <div>
          <h3>尚未擁有書籍！</h3>
          <br />
          {currentUser.user.role === 'user' && (
            <p>
              前往搜尋頁面挑選心儀書籍👉&ensp;
              <button
                className='btn btn-primary'
                onClick={() => {
                  linkSet('#search', setPreLink, preLink);
                  navigate('/search');
                }}
              >
                搜尋頁面
              </button>
            </p>
          )}
          {currentUser.user.role === 'author' && (
            <p>
              前往上架頁面上架作品👉&ensp;
              <button
                className='btn btn-primary'
                onClick={() => {
                  linkSet('#post-book', setPreLink, preLink);
                  navigate('/post-book');
                }}
              >
                上架頁面
              </button>
            </p>
          )}
        </div>
      )}
      {currentUser && check === 0 && <Loading />}
      {currentUser && books.length !== 0 && check === 1 && (
        <>
          <h3>{currentUser.user.name.split(' ')[0]}'s Books:</h3>
          <br />
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {books.map((b) => (
              <div className='col' key={b._id}>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{b.name}</h5>
                    <p className='card-text'>{b.summary}</p>
                    {currentUser.user.role !== 'author' && (
                      <p className='className'>作者： {b.author.name}</p>
                    )}
                    <p className='card-text'>
                      評價：{' '}
                      {b.ratingsAverage === 4.5 && b.ratingsQuantity === 0
                        ? '尚無評價'
                        : `${b.ratingsAverage} / 5`}
                    </p>
                    <p className='card-text'>價格： {b.price}</p>
                    <div className='gap-2 d-flex justify-content-end'>
                      <button
                        onClick={getSpeciedBook}
                        id={b._id}
                        className='btn btn-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#exampleModal'
                      >
                        詳細
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className='modal'
            id='exampleModal'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-scrollable'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    {book.name}
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>

                <div className='modal-body'>
                  <p className='fw-bold'>簡述：</p>
                  {!book.summary.includes('\n') && <p>{book.summary}</p>}
                  {book.summary.includes('\n') &&
                    arrS.map((s, i) => <p key={i}>{s}</p>)}
                  <p className='fw-bold'>詳細：</p>
                  {!book.description.includes('\n') && (
                    <p>{book.description}</p>
                  )}
                  {book.description.includes('\n') &&
                    arrD.map((d, i) => <p key={i}>{d}</p>)}
                  <p className='fw-bold'>作者：</p>
                  <p>{book.author.name}</p>
                  <p className='fw-bold'>作品類型：</p>
                  <p>{book.type}</p>
                  <p className='fw-bold'>價格：</p>
                  <p>{book.price}</p>
                </div>
                <div className='modal-footer'>
                  {currentUser.user.role === 'author' && (
                    <>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        取消
                      </button>
                      <button
                        id={book._id}
                        onClick={() => {
                          navigate('/update-book');
                        }}
                        type='button'
                        className='btn btn-success'
                        data-bs-dismiss='modal'
                      >
                        修改
                      </button>
                    </>
                  )}
                  {currentUser.user.role === 'user' && (
                    <>
                      <button
                        className='btn btn-secondary'
                        type='button'
                        data-bs-dismiss='modal'
                      >
                        關閉
                      </button>
                      <button
                        id={book._id}
                        onClick={() => {
                          navigate('/post-review');
                        }}
                        className='btn btn-success'
                        type='button'
                        data-bs-dismiss='modal'
                      >
                        撰寫評論
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookPage;
