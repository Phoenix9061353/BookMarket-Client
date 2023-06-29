import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewService from '../../service/reviewService';
import Waiting from '../tool/Waiting';
import Warning from '../tool/Warning';

const Updatereview = (props) => {
  const { currentUser, review } = props;
  const navigate = useNavigate();
  //state
  let [msg, setMsg] = useState('');
  let [content, setContent] = useState(review ? review.review : '');
  let [rating, setRating] = useState(review ? review.rating : '');
  let [prepare, setPrepare] = useState(false);
  //handler
  const handleContent = (e) => {
    setContent(e.target.value.trim());
  };
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const updateReview = async (e) => {
    e.preventDefault();
    setPrepare(true);
    try {
      await ReviewService.updateReview(e.target.id, {
        review: content,
        rating,
      });

      window.alert('修改成功！導向評論集(My Reviews)頁面...');

      setPrepare(false);
      navigate('/my-reviews');
    } catch (err) {
      setMsg(err.response.data.message);
      setPrepare(false);
    }
  };
  //////////////////////////////////////////////////
  return (
    <div
      style={{ padding: '3rem' }}
      className='container d-flex justify-content-center'
    >
      {(!currentUser ||
        currentUser.user.role !== 'user' ||
        currentUser.user._id !== review.user._id) && (
        <Warning
          message={'🚨 只有撰寫該Review的使用者可以拜訪此頁面！🚨'}
          colorType={'danger'}
        />
      )}
      {prepare && <Waiting message={'處理中...'} />}
      {currentUser &&
        currentUser.user.role === 'user' &&
        currentUser.user._id === review.user._id && (
          <div className='col-md-6'>
            <div className='h-100 p-4 bg-light border rounded-3'>
              <h4>修改書評</h4>
              <br />
              {msg && <Warning message={msg} colorType={'danger'} />}

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
                <div className='d-flex justify-content-end'>
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
