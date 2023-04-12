import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewService from '../../service/reviewService';
const PostReview = (props) => {
  const { currentUser, book } = props;
  const navigate = useNavigate();
  //state
  let [msg, setMsg] = useState('');
  let [content, setContent] = useState('');
  let [rating, setRating] = useState(4.5);
  //handler
  const handleContent = (e) => {
    setContent(e.target.value.trim());
  };
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const postReview = async (e) => {
    e.preventDefault();
    try {
      const result = await ReviewService.createReview(book._id, {
        name: book.name,
        review: content,
        rating,
      });
      if (result.data.data.message === 'Yes') {
        return setMsg(
          '你已經對這本書做過評論！(如需修改相關評論內容請至「My Reviews」頁面)'
        );
      }
      if (result.data.data.review) {
        window.alert('評論成功！導向評論集(My Reviews)頁面...');
        navigate('/my-reviews');
      }
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };
  ///////////////////////////////////////////////////////////
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
      {currentUser && currentUser.user.role === 'user' && (
        <div className='col-md-6'>
          <div className='h-100 p-4 bg-light border rounded-3'>
            <h4>撰寫書評</h4>
            <br />
            {msg && (
              <div
                className='alert alert-danger d-flex align-items-center'
                role='alert'
              >
                {msg}
              </div>
            )}
            <form onSubmit={postReview}>
              <div className='mb-3'>
                <label htmlFor='bookName' className='form-label fw-bold'>
                  書名
                </label>
                <input
                  type='text'
                  className='form-control'
                  defaultValue={book.name}
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
                  placeholder='寫些什麼吧...'
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
                  defaultValue={4.5}
                  step={0.1}
                  required
                />
              </div>
              <div className='d-md-flex justify-content-md-end'>
                <button className='btn btn-primary btn--post' type='submit'>
                  提交
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostReview;
