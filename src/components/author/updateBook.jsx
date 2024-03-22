import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BookService from '../../service/bookService';
import Waiting from '../tool/Waiting';
import Warning from '../tool/Warning';

//////////////////////////////////////////////////////////

const UpdateBook = (props) => {
  const { currentUser, book } = props;
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  //Ref
  const postButton = useRef();
  ///////////////////////////////////////////
  //state
  let [msg, setMsg] = useState('');
  let [prepare, setPrepare] = useState(false);

  //handleUpdate
  const updateOneBook = async (inputData) => {
    const { name, summary, description, price, type } = inputData;
    setPrepare(true);
    postButton.current.textContent = '處理中...';
    postButton.current.classList.add('pe-none');

    try {
      await BookService.updateBook(book._id, {
        name,
        summary,
        description,
        price,
        type,
      });
      postButton.current.classList.remove('pe-none');
      postButton.current.textContent = 'Update';
      setPrepare(false);
      window.alert('修改成功！按下確定後導回作品集頁面(My Book)...');
      navigate('/my-books');
    } catch (err) {
      setMsg(err.response.data.message);
      setPrepare(false);
    }
  };
  ///////////////////////////////////////////
  return (
    <div
      style={{ padding: '3rem' }}
      className='container d-flex justify-content-center'
    >
      {(!currentUser ||
        currentUser.user.role !== 'author' ||
        currentUser.user._id !== book.author._id) && (
        <Warning
          message={'🚨 只有此本書的「作者(author)」登入後才可以拜訪此頁面！🚨'}
          colorType={'danger'}
        />
      )}
      {prepare && <Waiting message={'處理中...'} />}
      {currentUser &&
        currentUser.user.role === 'author' &&
        currentUser.user._id === book.author._id && (
          <div className='col-md-6'>
            <div className='h-100 p-4 bg-light border rounded-3'>
              {msg && <Warning message={msg} colorType={'danger'} />}
              <form
                id={book._id}
                onSubmit={handleSubmit((data) => updateOneBook(data))}
              >
                <div className='mb-3'>
                  <label htmlFor='inputName' className='form-label fw-bold'>
                    書名
                  </label>
                  <input
                    type='text'
                    {...register('name')}
                    id='inputName'
                    className='form-control'
                    aria-describedby='nameHelp'
                    defaultValue={book.name}
                    required
                  />
                  <div id='nameHelp' className='form-text'>
                    書名需為至少三個字元以上，開頭與結尾不可為空白字元的字串
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='inputSummary' className='form-label fw-bold'>
                    簡述
                  </label>
                  <input
                    type='text'
                    id='inputSummary'
                    {...register('summary')}
                    aria-describedby='summaryHelp'
                    className='form-control'
                    defaultValue={book.summary}
                    required
                  />
                  <div id='summaryHelp' className='form-text'>
                    請簡短描述一下書籍的內容（30字以內）
                  </div>
                </div>
                <div className='mb-3'>
                  <label
                    htmlFor='inputDescription'
                    className='form-label fw-bold'
                  >
                    詳細
                  </label>
                  <textarea
                    type='text'
                    {...register('description')}
                    className='form-control'
                    id='inputDescription'
                    aria-describedby='descriptionHelp'
                    defaultValue={book.description}
                  />
                  <div id='descriptionHelp' className='form-text'>
                    若有需要，可在此對書籍內容做更近一步的介紹（選填）
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='inputPrice' className='form-label fw-bold'>
                    價格&ensp;
                  </label>
                  <input
                    id='inputPrice'
                    {...register('price')}
                    type='number'
                    min={0}
                    max={9999}
                    defaultValue={book.price}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='selectType' className='form-label fw-bold'>
                    作品類型
                  </label>
                  <select
                    id='selectType'
                    {...register('type')}
                    className='form-select'
                    defaultValue={book.type}
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
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default UpdateBook;
