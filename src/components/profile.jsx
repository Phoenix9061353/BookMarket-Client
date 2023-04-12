import React, { useState } from 'react';
import UserService from '../service/userService';
import AuthService from '../service/authService';

const ProfilePage = (props) => {
  document.title = 'BookMarket | Profile';
  const { currentUser, setCurrentUser } = props;
  const btnUpdateData = document.querySelector('.btn--updateData');
  const btnUpdatePass = document.querySelector('.btn--updatePass');
  ////////////////////////////////////////////////////////////////
  //state
  //msg
  let [msg, setMsg] = useState('');
  let [msgP, setMsgP] = useState('');
  //form1
  let [name, setName] = useState(currentUser.user.name);
  let [email, setEmail] = useState(currentUser.user.email);
  //form2
  let [oldPass, setOldPass] = useState('');
  let [newPass, setNewPass] = useState('');
  let [newPassC, setnewPassC] = useState('');
  ////////////////////////////////////////////////////////////////
  //handler
  //form1
  const handleN = (e) => {
    setName(e.target.value.trim());
  };
  const handleE = (e) => {
    setEmail(e.target.value.trim());
  };
  const handleUpdateData = async (e) => {
    e.preventDefault();
    btnUpdateData.classList.add('pe-none');
    btnUpdateData.textContent = '處理中...';
    setMsg('');
    try {
      const result = await UserService.updateUserData(currentUser.user._id, {
        name,
        email,
      });
      if (result.data.data.token) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
      }
      setCurrentUser(AuthService.getCurrentUser());
      btnUpdateData.classList.remove('pe-none');
      btnUpdateData.textContent = '修改';
      window.alert('資料修改成功！');
    } catch (err) {
      setMsg(err.response.data.message);
      btnUpdateData.classList.remove('pe-none');
      btnUpdateData.textContent = '修改';
    }
  };

  //form2
  const handleOP = (e) => {
    setOldPass(e.target.value);
  };
  const handleNP = (e) => {
    setNewPass(e.target.value);
  };
  const handleNPC = (e) => {
    setnewPassC(e.target.value);
  };
  const handleUpdatePass = async (e) => {
    e.preventDefault();
    btnUpdatePass.classList.add('pe-none');
    btnUpdatePass.textContent = '處理中...';
    setMsgP('');
    try {
      const result = await UserService.updateUserPassword({
        oldPass: oldPass,
        newPass: newPass,
        newPassConfirm: newPassC,
      });
      if (result.data.data.token) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
      }
      setCurrentUser(AuthService.getCurrentUser());
      document.querySelector('#inputOldPass').value = '';
      document.querySelector('#inputNewPass').value = '';
      document.querySelector('#inputNewPassConfirm').value = '';
      btnUpdatePass.textContent = '修改';
      btnUpdatePass.classList.remove('pe-none');
      window.alert('密碼更改成功！');
    } catch (err) {
      btnUpdatePass.textContent = '修改';
      btnUpdatePass.classList.remove('pe-none');
      setMsgP(err.response.data.message);
    }
  };
  ////////////////////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div
          className='alert alert-danger d-flex justify-content-center'
          role='alert'
        >
          <div className='fw-bold'>🚨 請先登入後再拜訪此頁面！🚨</div>
        </div>
      )}
      {currentUser && (
        <>
          <div className='container'>
            <h1>Welcome to {currentUser.user.name.split(' ')[0]}'s profile!</h1>
            <br />
            <div className='row align-items-md-stretch mt-4'>
              <div className='col-md-6'>
                <div className='h-100 p-4 bg-light border rounded-3'>
                  {msg && (
                    <div
                      className='alert alert-warning d-flex justify-content-center'
                      role='alert'
                    >
                      <div>{msg}</div>
                    </div>
                  )}
                  <form onSubmit={handleUpdateData}>
                    <div className='mb-3'>
                      <label htmlFor='inputName' className='form-label fw-bold'>
                        User Name
                      </label>
                      <input
                        type='text'
                        onChange={handleN}
                        id='inputName'
                        className='form-control'
                        aria-describedby='nameHelp'
                        defaultValue={currentUser.user.name}
                        required
                      />
                      <div id='nameHelp' className='form-text'>
                        名字的前後不可為空白字元
                      </div>
                    </div>
                    <div className='mb-3'>
                      <label
                        htmlFor='inputEmail'
                        className='form-label fw-bold'
                      >
                        User Email
                      </label>
                      <input
                        type='email'
                        onChange={handleE}
                        id='inputEmail'
                        className='form-control'
                        defaultValue={currentUser.user.email}
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='inputRole' className='form-label fw-bold'>
                        User Role
                      </label>
                      <input
                        type='text'
                        id='inputRole'
                        className='form-control'
                        defaultValue={currentUser.user.role}
                        disabled
                      />
                    </div>
                    <div className='d-md-flex justify-content-md-end'>
                      <button
                        type='submit'
                        tabIndex='-1'
                        aria-disabled='true'
                        className='btn btn-primary btn--updateData'
                      >
                        修改
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='h-100 p-4 border bg-light rounded-3'>
                  {msgP && (
                    <div
                      className='alert alert-warning d-flex justify-content-center'
                      role='alert'
                    >
                      <div>{msgP}</div>
                    </div>
                  )}
                  <form onSubmit={handleUpdatePass}>
                    <div className='mb-3'>
                      <label
                        htmlFor='inputOldPass'
                        className='form-label fw-bold'
                      >
                        現在密碼
                      </label>
                      <input
                        type='password'
                        onChange={handleOP}
                        id='inputOldPass'
                        className='form-control'
                        placeholder='••••••••'
                        required
                      />
                    </div>
                    <div className='mb-3'>
                      <label
                        htmlFor='inputNewPass'
                        className='form-label fw-bold'
                      >
                        新密碼
                      </label>
                      <input
                        type='password'
                        onChange={handleNP}
                        id='inputNewPass'
                        className='form-control'
                        placeholder='••••••••'
                        aria-describedby='passHelp'
                        minLength={8}
                        required
                      />
                      <div id='passHelp' className='form-text'>
                        密碼須為至少八字元以上的字串
                      </div>
                    </div>
                    <div className='mb-3'>
                      <label
                        htmlFor='inputNewPassConfirm'
                        className='form-label fw-bold'
                      >
                        新密碼確認
                      </label>
                      <input
                        type='password'
                        onChange={handleNPC}
                        id='inputNewPassConfirm'
                        className='form-control'
                        placeholder='••••••••'
                        required
                      />
                    </div>
                    <div className='d-md-flex justify-content-md-end'>
                      <button
                        type='submit'
                        tabIndex='-1'
                        aria-disabled='true'
                        className='btn btn-primary btn--updatePass'
                      >
                        修改
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
