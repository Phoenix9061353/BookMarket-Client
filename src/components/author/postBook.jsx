import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BookService from '../../service/bookService';
import Warning from '../tool/Warning';
import Waiting from '../tool/Waiting';
import { linkSet } from '../tool/select';
import { ChangeTitle } from '../tool/ChangeTitle';

const PostBook = (props) => {
  const { currentUser, preLink, setPreLink } = props;
  const navigate = useNavigate();

  //Ref
  const postButton = useRef();
  const priceInput = useRef();
  const typeSelect = useRef();

  //custom hook
  ChangeTitle('Post Book');
  ////////////////////////////////////////////////////
  //state
  let [msg, setMsg] = useState('');
  let [name, setName] = useState('');
  let [summary, setSummary] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState(0);
  let [type, setType] = useState('日常');
  let [prepare, setPrepare] = useState(false);
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
    setPrepare(true);

    postButton.current.textContent = '處理中';
    postButton.current.classList.add('pe-none');
    try {
      await BookService.createOneBook({
        name,
        summary,
        description,
        price,
        type,
      });
      postButton.current.textContent = 'Post';
      postButton.current.classList.remove('pe-none');
      setPrepare(false);
      const check = window.confirm('上傳成功！導向作品頁面(My Book)?');
      if (check) {
        linkSet('#my-books', setPreLink, preLink);
        navigate('/my-books');
      }
      if (!check) {
        document
          .querySelectorAll('.form-control')
          .forEach((el) => (el.value = ''));
        priceInput.current.value = 0;
        typeSelect.current.value = '日常';
        setName('');
        setSummary('');
        setDescription('');
        setPrice(0);
      }
    } catch (err) {
      setMsg(err.response.data.message);
      setPrepare(false);
    }
  };
  ////////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      {(!currentUser || currentUser.user.role !== 'author') && (
        <Warning
          message={'🚨 請先以身份「作者(author)」登入後再拜訪此頁面！🚨'}
          colorType={'danger'}
        />
      )}
      {msg && <Warning message={msg} colorType={'warning'} />}
      {prepare && <Waiting message={'處理中...（請勿離開當前頁面）'} />}
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
              ref={priceInput}
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
              ref={typeSelect}
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
            <button
              className='btn btn-primary btn--post'
              type='submit'
              ref={postButton}
            >
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostBook;
