import React, { useRef, useState } from 'react';
import UserService from '../../service/userService';
import AuthService from '../../service/authService';
import Warning from '../tool/Warning';
import { ChangeTitle } from '../tool/ChangeTitle';

const ProfilePage = (props) => {
  ChangeTitle('Profile');
  const { currentUser, setCurrentUser } = props;

  //Ref
  const updateDataButton = useRef();
  const updatePassButton = useRef();
  const inputOldPass = useRef();
  const inputNewPass = useRef();
  const inputNewPassConfirm = useRef();

  ////////////////////////////////////////////////////////////////
  //state
  //msg
  let [msg, setMsg] = useState('');
  let [msgP, setMsgP] = useState('');
  //form1
  let [name, setName] = useState(currentUser ? currentUser.user.name : '');
  let [email, setEmail] = useState(currentUser ? currentUser.user.email : '');
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
    updateDataButton.current.classList.add('pe-none');
    updateDataButton.current.textContent = '處理中...';
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
      updateDataButton.current.classList.remove('pe-none');
      updateDataButton.current.textContent = '修改';
      window.alert('資料修改成功！');
    } catch (err) {
      setMsg(err.response.data.message);
      updateDataButton.current.classList.remove('pe-none');
      updateDataButton.current.textContent = '修改';
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
    updatePassButton.current.classList.add('pe-none');
    updatePassButton.current.textContent = '處理中...';
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
      inputOldPass.current.value = '';
      inputNewPass.current.value = '';
      inputNewPassConfirm.current.value = '';
      updatePassButton.current.textContent = '修改';
      updatePassButton.current.classList.remove('pe-none');
      window.alert('密碼更改成功！');
    } catch (err) {
      updatePassButton.current.textContent = '修改';
      updatePassButton.current.classList.remove('pe-none');
      setMsgP(err.response.data.message);
    }
  };
  ////////////////////////////////////////////////////////////////
  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <Warning
          message={'🚨 請先登入後再拜訪此頁面！🚨'}
          colorType={'danger'}
        />
      )}
      {currentUser && (
        <>
          <div className='container'>
            <h1>Welcome to {currentUser.user.name.split(' ')[0]}'s profile!</h1>
            <br />
            <div className='row g-4 align-items-md-stretch'>
              <div className='col-md-6'>
                <div className='h-100 p-4 bg-light border rounded-3'>
                  {msg && <Warning message={msg} colorType={'warning'} />}
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
                    <div className='d-flex justify-content-end'>
                      <button
                        type='submit'
                        tabIndex='-1'
                        aria-disabled='true'
                        className='btn btn-primary btn--updateData'
                        ref={updateDataButton}
                      >
                        修改
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='h-100 p-4 border bg-light rounded-3'>
                  {msgP && <Warning message={msgP} colorType={'warning'} />}
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
                        ref={inputOldPass}
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
                        ref={inputNewPass}
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
                        ref={inputNewPassConfirm}
                        required
                      />
                    </div>
                    <div className='d-flex justify-content-end'>
                      <button
                        type='submit'
                        tabIndex='-1'
                        aria-disabled='true'
                        className='btn btn-primary btn--updatePass'
                        ref={updatePassButton}
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
