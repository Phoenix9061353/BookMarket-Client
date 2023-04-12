import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewService from '../../service/reviewService';

const Updatereview = (props) => {
  const { currentUser, review } = props;
  const navigate = useNavigate();
  const submitBtn = document.querySelector('.btn--post');
  //state
  let [msg, setMsg] = useState('');
  let [content, setContent] = useState(review.review);
  let [rating, setRating] = useState(review.rating);
  //handler
  const handleContent = (e) => {
    setContent(e.target.value.trim());
  };
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const updateReview = async (e) => {
    e.preventDefault();
    submitBtn.textContent = '處理中';
    submitBtn.classList.add('pe-none');
    try {
      await ReviewService.updateReview(e.target.id, {
        review: content,
        rating,
      });
      submitBtn.textContent = '修改';
      window.alert('修改成功！導向評論集(My Reviews)頁面...');
      submitBtn.classList.remove('pe-none');
      navigate('/my-reviews');
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };
  //////////////////////////////////////////////////
  return (
    <div
      style={{ padding: '3rem' }}
      className='container d-flex justify-content-center'
    >
      {(!currentUser || currentUser.user.role !== 'user') && (
        <div
          className='alert alert-danger d-flex justify-content-center'
          role='alert'
        >
          <div className='fw-bold'>
            🚨 請先以「使用者(user)」身份登入後再拜訪此頁面！🚨
          </div>
        </div>
      )}
      {currentUser &&
        currentUser.user.role === 'user' &&
        currentUser.user._id === review.user._id && (
          <div className='col-md-6'>
            <div className='h-100 p-4 bg-light border rounded-3'>
              <h4>修改書評</h4>
              <br />
              {msg && (
                <div
                  className='alert alert-danger d-flex align-items-center'
                  role='alert'
                >
                  {msg}
                </div>
              )}
              <form id={review._id} onSubmit={updateReview}>
                <div className='mb-3'>
                  <label htmlFor='bookName' className='form-label fw-bold'>
                    書名
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={review.name}
                    disabled
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='inputRview' className='form-label fw-bold'>
                    評論
                  </label>
                  <textarea
                    name='inputReview'
                    id='inputReview'
                    onChange={handleContent}
                    className='form-control'
                    defaultValue={review.review}
                    aria-describedby='reviewHelp'
                    required
                  />
                  <div id='reviewHelp' className='form-text'>
                    請留下您對於本書的心得(必填，限150字)
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='inputRating' className='form-label fw-bold'>
                    評價&ensp;
                  </label>
                  <input
                    id='inputRating'
                    type='number'
                    onChange={handleRating}
                    min={1}
                    max={5}
                    defaultValue={review.rating}
                    step={0.1}
                    required
                  />
                </div>
                <div className='d-md-flex justify-content-md-end'>
                  <button className='btn btn-primary btn--post' type='submit'>
                    修改
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default Updatereview;
