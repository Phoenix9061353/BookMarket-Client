import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthService from '../../service/authService';
import Waiting from '../tool/Waiting';
import Warning from '../tool/Warning';
// import { linkSet } from '../tool/select';
import { ChangeTitle } from '../tool/ChangeTitle';

///////////////////////////////////////////////////////////
const LoginPage = (props) => {
  ChangeTitle('Login');

  // const { preLink, setCurrentUser, setPreLink } = props;
  const { setCurrentUser } = props;

  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  //State
  let [msg, setMsg] = useState('');
  let [check, setCheck] = useState(false);

  //Handler
  const handleLogin = async (data) => {
    setCheck(true);
    try {
      const user = await AuthService.login(data.email, data.password);
      if (user.data.data.token) {
        localStorage.setItem('user', JSON.stringify(user.data.data));
        setCurrentUser(AuthService.getCurrentUser());
      }

      window.alert('登入成功！按下確定後導向個人檔案頁面...');
      setCheck(false);
      // linkSet('#profile', setPreLink);
      navigate('/profile');
    } catch (err) {
      if (err) {
        console.log(err);
        setMsg(err.response.data.message);

        setCheck(false);
      }
    }
  };
  ////////////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      <h3>帳號登入</h3>
      <hr />
      {msg && <Warning message={msg} colorType={'danger'} />}
      {check && <Waiting message={'登入中...'} />}
      <div className='container pt-3'>
        <div className='col-md-4'>
          <div className='h-100 p-4 bg-light border rounded-3'>
            <form
              onSubmit={handleSubmit((data) => {
                handleLogin(data);
                reset();
              })}
            >
              <div className='mb-3'>
                <label htmlFor='inputEmail' className='form-label'>
                  Email address
                </label>
                <input
                  {...register('email', { required: true })}
                  type='email'
                  id='inputEmail'
                  className='form-control'
                  placeholder='you@example.com'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='inputPassword' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  {...register('password', { required: true })}
                  id='inputPassword'
                  className='form-control'
                  placeholder='••••••••'
                />
              </div>
              <br />
              <div className='d-flex justify-content-end'>
                <button type='submit' className='btn btn-primary'>
                  登入
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='pt-4'>
          <p className='fw-normal'>
            還沒有帳號嗎？👉&ensp;
            <a
              className='link-underline-primary'
              href='#/signup'
              onClick={() => {
                // linkSet('#signup', setPreLink, preLink);
                navigate('/signup');
              }}
            >
              帳號註冊
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
