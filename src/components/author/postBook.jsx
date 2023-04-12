import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookService from '../../service/bookService';

const PostBook = (props) => {
  const { currentUser } = props;
  const navigate = useNavigate();
  document.title = 'BookMarket | Post Book';
  ////////////////////////////////////////////////////
  //state
  let [msg, setMsg] = useState('');
  let [name, setName] = useState('');
  let [summary, setSummary] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState(0);
  let [type, setType] = useState('日常');
  //handler
  const handleN = (e) => {
    setName(e.target.value.trim());
  };
  const handleS = (e) => {
    setSummary(e.target.value.trim());
  };
  const handleD = (e) => {
    setDescription(e.target.value.trim());
  };
  const handleP = (e) => {
    setPrice(e.target.value);
  };
  const handleT = (e) => {
    setType(e.target.value);
  };
  //handlePost
  const postBook = async (e) => {
    e.preventDefault();
    setMsg('');
    document.querySelector('.btn--post').textContent = '處理中...';
    document.querySelector('.btn--post').classList.add('pe-none');
    try {
      await BookService.createOneBook({
        name,
        summary,
        description,
        price,
        type,
      });
      document.querySelector('.btn--post').textContent = 'Post';
      document.querySelector('.btn--post').classList.remove('pe-none');
      const check = window.confirm('上傳成功！導向作品頁面(My Book)?');
      if (check) return navigate('/my-books');
      if (!check) {
        document
          .querySelectorAll('.form-control')
          .forEach((el) => (el.value = ''));
        document.querySelector('#inputPrice').value = 0;
        document.querySelector('#selectType').value = '日常';
        setName('');
        setSummary('');
        setDescription('');
        setPrice(0);
      }
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };
  ////////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      {(!currentUser || currentUser.user.role !== 'author') && (
        <div
          className='alert alert-danger d-flex justify-content-center'
          role='alert'
        >
          <div className='fw-bold'>
            🚨 請先以身份「作者(author)」登入後再拜訪此頁面！🚨
          </div>
        </div>
      )}
      {msg && (
        <div
          className='alert alert-warning d-flex align-items-center'
          role='alert'
        >
          {msg}
        </div>
      )}
      {currentUser && currentUser.user.role === 'author' && (
        <form onSubmit={postBook}>
          <div className='mb-3'>
            <label htmlFor='inputName' className='form-label fw-bold'>
              書名
            </label>
            <input
              type='text'
              id='inputName'
              onChange={handleN}
              className='form-control'
              minLength={3}
              aria-describedby='nameHelp'
              required
            />
            <div className='form-text'>
              書名需為至少三個字元以上，開頭與結尾不可為空白字元的字串
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='inputSummary' className='form-label fw-bold'>
              簡述
            </label>
            <input
              type='text'
              className='form-control'
              onChange={handleS}
              id='inputSummary'
              maxLength={30}
              aria-describedby='summaryHelp'
              required
            />
            <div className='form-text'>
              請簡短描述一下書籍的內容（30字以內）
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='inputDescription' className='form-label fw-bold'>
              詳細
            </label>
            <textarea
              type='text'
              onChange={handleD}
              className='form-control'
              id='inputDescription'
              aria-describedby='descriptionHelp'
            />
            <div className='form-text'>
              若有需要，可在此對書籍內容做更近一步的介紹（選填）
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='inputPrice' className='form-label fw-bold'>
              價格&ensp;
            </label>
            <input
              id='inputPrice'
              type='number'
              onChange={handleP}
              min={0}
              max={9999}
              defaultValue={0}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='selectType' className='form-label fw-bold'>
              作品類型
            </label>
            <select
              id='selectType'
              onChange={handleT}
              className='form-select'
              defaultValue={'日常'}
            >
              <option value='懸疑'>懸疑</option>
              <option value='科幻'>科幻</option>
              <option value='戀愛'>戀愛</option>
              <option value='恐怖'>恐怖</option>
              <option value='日常'>日常</option>
              <option value='其他'>其他</option>
            </select>
          </div>
          <div className='d-md-flex justify-content-md-end'>
            <button className='btn btn-primary btn--post' type='submit'>
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostBook;
