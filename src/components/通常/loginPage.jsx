import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/authService';

///////////////////////////////////////////////////////////
const LoginPage = (props) => {
  document.title = 'BookMarket | Login';
  const { setCurrentUser } = props;
  const navigate = useNavigate();
  //State
  let [email, setEmail] = useState('');
  let [pass, setPass] = useState('');
  let [msg, setMsg] = useState('');
  //Handler
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPass(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthService.login(email, pass);
      if (user.data.data.token) {
        localStorage.setItem('user', JSON.stringify(user.data.data));
      }
      setCurrentUser(AuthService.getCurrentUser());
      window.alert('登入成功！按下確定後導向個人檔案頁面...');
      navigate('/profile');
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };
  ////////////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      <h3>帳號登入</h3>
      <hr />
      {msg && (
        <div
          className='alert alert-danger d-flex align-items-center'
          role='alert'
        >
          <div>{msg}</div>
        </div>
      )}
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
              <div className='d-md-flex justify-content-md-end'>
                <button type='submit' className='btn btn-primary'>
                  登入
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='d-flex pt-4'>
          <p className='text-md-start fw-normal'>
            還沒有帳號嗎？來申請一個吧 👉&ensp;
            <button
              className='btn btn-primary'
              onClick={() => {
                navigate('/signup');
              }}
            >
              帳號註冊
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
