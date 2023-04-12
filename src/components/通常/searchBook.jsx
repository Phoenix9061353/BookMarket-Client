import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookService from '../../service/bookService';
import BookingService from '../../service/bookingService';

const SearchBook = (props) => {
  const { currentUser, book, setBook } = props;
  document.title = 'BookMarket | Search';
  const navigate = useNavigate();
  let arrD = [];
  if (book.description.includes('\n')) {
    arrD = book.description.split('\n');
  }
  //state
  let [books, setBooks] = useState('');
  let [searchInput, setSearchInput] = useState('');
  let [check, setCheck] = useState(0);
  let [msg, setMsg] = useState('default');
  //handler
  const handleS = (e) => {
    setSearchInput(e.target.value.trim());
  };
  const handleB = async (e) => {
    if (!currentUser || currentUser.user.role !== 'user') {
      return window.alert('請先以「使用者（user）」的身份登入後再執行此動作！');
    }
    // window.alert('即將跳轉至購買頁面...');
    if (currentUser.user.role === 'user') {
      try {
        const result = await BookingService.checkBooking(e.target.id);
        if (result.data.data.message === 'Yes') {
          return window.alert('你已經擁有此書！');
        }
        if (result.data.data.message === 'No') {
          try {
            await BookingService.createBooking(e.target.id);
            const checking = window.confirm(
              '購買成功！導覽至作品集(My Book)頁面？'
            );
            if (checking) navigate('/my-books');
          } catch (err) {
            setMsg(err.response.data.message);
          }
        }
      } catch (err) {
        setMsg(err.response.data.message);
      }
    }
  };
  const searchR = async () => {
    setCheck(1);
    setMsg('default');
    setBooks('');
    if (searchInput === '') {
      setCheck(0);
      return setMsg('請輸入要找尋的內容！');
    }
    try {
      const result = await BookService.getSearchBook(searchInput);
      setBooks(result.data.data.books);
      setCheck(2);
      if (result.data.data.books.length === 0) {
        setCheck(0);
        return setMsg('無相關的結果！');
      }
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };
  const getSpeciedBook = (e) => {
    const result = books.find((el) => el._id === e.target.id);
    setBook(result);
  };

  ///////////////////////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      <div className='d-flex'>
        <input
          className='form-control me-2'
          onChange={handleS}
          type='text'
          list='typeList'
          placeholder='輸入種類（日常、恐怖、戀愛、科幻、懸疑、其他）或書名查詢...'
          id='search'
        />
        <datalist id='typeList' style={{ display: 'none' }}>
          <option value='日常'>日常</option>
          <option value='恐怖'>恐怖</option>
          <option value='戀愛'>戀愛</option>
          <option value='科幻'>科幻</option>
          <option value='懸疑'>懸疑</option>
          <option value='其他'>其他</option>
        </datalist>
        <button onClick={searchR} className='btn btn-primary'>
          Search
        </button>
      </div>
      <br />
      {msg && msg !== 'default' && (
        <div className='col-4'>
          <div
            className='alert alert-warning d-flex align-items-center'
            role='alert'
          >
            <div>{msg}</div>
          </div>
        </div>
      )}
      {check === 1 && (
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}
      {books && books.length !== 0 && check === 2 && (
        <>
          <p className='fw-bold'>搜尋結果：</p>

          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {books.map((b) => (
              <div className='col' key={b._id}>
                <div
                  className='card'
                  style={{ width: '25rem', height: '16.5rem' }}
                >
                  <div className='card-body overflow-scroll'>
                    <h5 className='card-title'>{b.name}</h5>
                    <p className='card-text'>{b.summary}</p>
                    <p className='className'>作者： {b.author.name}</p>
                    <p className='card-text'>評價： {b.ratingsAverage} / 5</p>
                    <p className='card-text'>價格: {b.price}</p>
                    <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
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
            className='modal fade'
            id='exampleModal'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-fullscreen'>
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
                  <p>{book.summary}</p>
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
                  <p className='fw-bold'>
                    讀者評論({book.reviews ? book.reviews.length : 0})：
                  </p>
                  <br />
                  <div
                    className='row row-cols-1 row-cols-md-3 g-4 overflow-scroll'
                    style={{ height: '15rem' }}
                  >
                    {book.reviews &&
                      book.reviews.length > 0 &&
                      book.reviews.map((r) => (
                        <div className='col' key={r._id}>
                          <div
                            className='card'
                            style={{ width: '28rem', height: '12rem' }}
                          >
                            <div className='card-body overflow-scroll'>
                              <p className='card-title'>
                                讀者： {r.user.name.split(' ')[0]}
                              </p>
                              <p className='card-text'>評價： {r.rating} / 5</p>
                              <p className='card-text'>評論：</p>
                              <p className='card-text'>{r.review}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    取消
                  </button>
                  <button
                    id={book._id}
                    onClick={handleB}
                    type='button'
                    className='btn btn-primary'
                    data-bs-dismiss='modal'
                  >
                    購買
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBook;
