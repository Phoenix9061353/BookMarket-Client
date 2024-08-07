import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewService from '../../service/reviewService';
import Loading from '../tool/Loading';
import Warning from '../tool/Warning';
import Waiting from '../tool/Waiting';
import { ChangeTitle } from '../tool/ChangeTitle';

const MyReview = (props) => {
  ChangeTitle('My Review');
  let { currentUser, review, setReview } = props;
  const navigate = useNavigate();

  //state
  let [msg, setMsg] = useState('');

  let [reviews, setReviews] = useState('');
  let [check, setCheck] = useState(0);
  let [preparing, setPreparing] = useState(false);

  let arrD = [];
  if (review.review.includes('\n')) {
    arrD = review.review.split('\n');
  }
  //handler
  const getReviews = async () => {
    if (!currentUser || currentUser.user.role !== 'user') {
      setCheck(2);
      return setMsg('🚨 請先以「使用者(user)」身份登入後再拜訪此頁面！🚨');
    }
    try {
      const result = await ReviewService.getUserReview();
      if (result.data.data.reviews.length !== 0) {
        setCheck(1);
        return setReviews(result.data.data.reviews);
      }
    } catch (err) {
      setMsg(err.response.data.message);
    }
    setCheck(2);
  };

  const getOneReview = (e) => {
    const result = reviews.find((el) => el._id === e.target.id);
    setReview(result);
  };

  const deleteReview = async (e) => {
    setPreparing(true);
    const check = window.confirm('是否刪除此評論？(提醒：執行後無法復原)');
    if (check) {
      try {
        await ReviewService.deleteReview(e.target.id);
        window.alert('刪除成功！');
        setPreparing(false);
        window.location.reload(true);
      } catch (err) {
        setMsg(err.response.data.message);
      }
    } else {
      setPreparing(false);
    }
  };
  //useEffect
  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ///////////////////////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      {msg && <Warning message={msg} colorType={'danger'} />}
      {preparing && <Waiting message={'處理中...'} />}
      {currentUser &&
        currentUser.user.role === 'user' &&
        reviews.length === 0 &&
        check === 2 && (
          <>
            <h3>尚未擁有評論！</h3>
            <br />
            <p>
              前往觀賞書籍並為它評論👉&ensp;
              <button
                className='btn btn-primary'
                onClick={() => {
                  navigate('/my-books');
                }}
              >
                My Books
              </button>
            </p>
          </>
        )}
      {currentUser && check === 0 && <Loading />}
      {currentUser && reviews.length !== 0 && check === 1 && (
        <>
          <h3>{currentUser.user.name.split(' ')[0]}'s Reviews</h3>
          <br />
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {reviews.map((r) => (
              <div className='col' key={r._id}>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{r.name}</h5>
                    <p className='card-text'>評價： {r.rating} / 5</p>
                    <div className='gap-2 d-flex justify-content-end'>
                      <button
                        className='btn btn-danger'
                        onClick={deleteReview}
                        id={r._id}
                      >
                        刪除
                      </button>
                      <button
                        id={r._id}
                        onClick={getOneReview}
                        className='btn btn-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#reviewModal'
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
            id='reviewModal'
            tabIndex='-1'
            aria-labelledby='reviewModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-scrollable'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='reviewModalLabel'>
                    {review.name}
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>

                <div className='modal-body'>
                  <p className='fw-bold'>評論：</p>
                  {!review.review.includes('\n') && <p>{review.review}</p>}
                  {review.review.includes('\n') &&
                    arrD.map((d, i) => <p key={i}>{d}</p>)}

                  <p className='fw-bold'>評價：</p>
                  <p>{review.rating} / 5</p>
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
                    id={review._id}
                    onClick={() => {
                      navigate('/update-review');
                    }}
                    type='button'
                    className='btn btn-success'
                    data-bs-dismiss='modal'
                  >
                    修改
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

export default MyReview;
