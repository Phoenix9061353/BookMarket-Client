import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthService from '../../service/authService';
import Waiting from '../tool/Waiting';
import Warning from '../tool/Warning';
import { linkSet } from '../tool/select';
import { ChangeTitle } from '../tool/ChangeTitle';

const SignupPage = (props) => {
  ChangeTitle('Sign Up');
  const { preLink, setCurrentUser, setPreLink } = props;
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  //state
  let [msg, setMsg] = useState('');
  let [check, setCheck] = useState(false);

  //handler
  const handleSignUp = async (inputData) => {
    const { name, email, password, passwordConfirm, role } = inputData;
    setMsg('');
    setCheck(true);
    try {
      const data = await AuthService.signup({
        name,
        email,
        password,
        passwordConfirm,
        role,
      });
      if (data.data.data.token) {
        localStorage.setItem('user', JSON.stringify(data.data.data));
      }
      setCurrentUser(AuthService.getCurrentUser());
      setCheck(false);
      window.alert('註冊成功！按下確定後導向個人頁面...');
      preLink.classList.remove('active');
      linkSet('#profile', setPreLink);
      navigate('/profile');
    } catch (err) {
      setMsg(err.response.data.message);
      setCheck(false);
    }
  };
  /////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      <h3>帳號註冊</h3>
      <hr />
      {msg && <Warning message={msg} colorType={'danger'} />}
      {check && <Waiting message={'處理中...'} />}
      <div className='row align-items-md-stretch'>
        <div className='col-md-6 p-4 bg-light rounded-3'>
          <form
            onSubmit={handleSubmit((data) => {
              handleSignUp(data);
              reset();
            })}
          >
            <div className='mb-3'>
              <label htmlFor='inputName' className='form-label'>
                User name
              </label>
              <input
                type='text'
                {...register('name')}
                id='inputName'
                aria-describedby='nameHelp'
                className='form-control'
                placeholder='Your name'
                required
              />
              <div id='nameHelp' className='form-text'>
                名字的前後不可為空白字元
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='inputEmail' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                {...register('email')}
                id='inputEmail'
                className='form-control'
                placeholder='you@example.com'
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='inputPassword' className='form-label'>
                Password
              </label>
              <input
                type='password'
                {...register('password')}
                id='inputPassword'
                className='form-control'
                aria-describedby='passHelp'
                placeholder='••••••••'
                minLength={8}
                required
              />
              <div id='passHelp' className='form-text'>
                密碼須為至少八字元以上的字串
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='inputPasswordConfirm' className='form-label'>
                Password Confirm
              </label>
              <input
                type='password'
                {...register('passwordConfirm')}
                id='inputPasswordConfirm'
                className='form-control'
                placeholder='••••••••'
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='inputRole' className='form-label'>
                Role
              </label>
              <select
                {...register('role')}
                id='inputRole'
                className='form-select'
                defaultValue='user'
                required
              >
                <option value='user'>user</option>
                <option value='author'>author</option>
              </select>
            </div>
            <div className='d-md-flex justify-content-md-end'>
              <button className='btn btn-primary' type='submit'>
                註冊
              </button>
            </div>
          </form>
        </div>
        <div className='col-md-6'>
          <img
            src='flower_butterfly.png'
            alt='Book'
            width='75%'
            height='70%'
            style={{ marginLeft: '6rem', marginTop: '8rem' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
