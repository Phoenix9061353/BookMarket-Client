import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/authService';

const SignupPage = (props) => {
  document.title = 'BookMarket | Sign Up';
  const { setCurrentUser } = props;
  const navigate = useNavigate();
  //state
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [pass, setPass] = useState('');
  let [passC, setPassC] = useState('');
  let [role, setRole] = useState('user');
  let [msg, setMsg] = useState('');
  //handler
  const handleN = (e) => {
    setName(e.target.value.trim());
  };
  const handleE = (e) => {
    setEmail(e.target.value);
  };
  const handleP = (e) => {
    setPass(e.target.value);
  };
  const handlePC = (e) => {
    setPassC(e.target.value);
  };
  const handleR = (e) => {
    setRole(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const data = await AuthService.signup({
        name,
        email,
        password: pass,
        passwordConfirm: passC,
        role,
      });
      if (data.data.data.token) {
        localStorage.setItem('user', JSON.stringify(data.data.data));
      }
      setCurrentUser(AuthService.getCurrentUser());
      window.alert('註冊成功！按下確定後導向個人頁面...');
      navigate('/profile');
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };
  /////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      <h3>帳號註冊</h3>
      <hr />
      {msg && (
        <div
          className='alert alert-danger d-flex align-items-center'
          role='alert'
        >
          <div>{msg}</div>
        </div>
      )}
      <div className='row align-items-md-stretch'>
        <div className='col-md-6 p-4 bg-light rounded-3'>
          <form onSubmit={handleSignUp}>
            <div className='mb-3'>
              <label htmlFor='inputName' className='form-label'>
                User name
              </label>
              <input
                type='text'
                onChange={handleN}
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
                onChange={handleE}
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
                onChange={handleP}
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
                onChange={handlePC}
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
                onChange={handleR}
                id='inputRole'
                className='form-select'
                defaultValue='user'
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
            src={require('../../img/flower_butterfly.png')}
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
