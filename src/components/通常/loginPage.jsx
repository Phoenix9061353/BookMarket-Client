import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/authService';
import Waiting from '../tool/Waiting';
import Warning from '../tool/Warning';
import { linkSet } from '../tool/select';

///////////////////////////////////////////////////////////
const LoginPage = (props) => {
  document.title = 'BookMarket | Login';
  const { preLink, setCurrentUser, setPreLink } = props;
  const navigate = useNavigate();

  //State
  let [email, setEmail] = useState('');
  let [pass, setPass] = useState('');
  let [msg, setMsg] = useState('');
  let [check, setCheck] = useState(false);
  //Handler
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPass(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setCheck(true);
    try {
      const user = await AuthService.login(email, pass);
      if (user.data.data.token) {
        localStorage.setItem('user', JSON.stringify(user.data.data));
      }
      setCurrentUser(AuthService.getCurrentUser());

      window.alert('登入成功！按下確定後導向個人檔案頁面...');
      setCheck(false);
      linkSet('#profile', setPreLink);
      navigate('/profile');
    } catch (err) {
      setMsg(err.response.data.message);
      setCheck(false);
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
            <form onSubmit={handleLogin}>
              <div className='mb-3'>
                <label htmlFor='inputEmail' className='form-label'>
                  Email address
                </label>
                <input
                  type='email'
                  onChange={handleEmail}
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
                  onChange={handlePassword}
                  id='inputPassword'
                  className='form-control'
                  placeholder='••••••••'
                  required
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
                linkSet('#signup', setPreLink, preLink);
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
