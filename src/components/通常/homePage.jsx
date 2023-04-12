import React from 'react';

const homePage = () => {
  document.title = 'BookMarket | Home';
  return (
    <main>
      <div className='container py-4'>
        <div className='p-5 mb-4 bg-light rounded-3'>
          <div className='container-fluid py-5'>
            <h1 className='display-5 fw-bold'>網站簡介</h1>
            <p className='col-md-8 fs-4'>
              一個類似於線上書店的網站
              <br />
              使用React.js及Bootstrap做網頁畫面的排版與顯示
              <br />
              後端伺服器與資料庫的部分則是使用了node.js和MongoDB來做架設
            </p>
            <button
              className='btn btn-primary btn-lg'
              type='button'
              data-bs-toggle='modal'
              data-bs-target='#introModal'
            >
              了解更多
            </button>
          </div>
        </div>

        <div className='row align-items-md-stretch'>
          <div className='col-md-6'>
            <div className='h-100 p-5 text-white bg-dark rounded-3'>
              <h2>As an user</h2>
              <p>
                註冊為一名使用者後，您可以在登入時購買心儀的書籍，
                <br />
                並對這些已購買的書籍作出評價
              </p>
              <button
                className='btn btn-outline-light'
                type='button'
                data-bs-toggle='modal'
                data-bs-target='#userModal'
              >
                了解更多
              </button>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='h-100 p-5 bg-light border rounded-3'>
              <h2>As an author</h2>
              <p>
                註冊為一名作者後，您可以在登入時上架您的作品，
                <br />
                並且可隨時對您的作品們進行編輯
              </p>
              <button
                className='btn btn-outline-secondary'
                type='button'
                data-bs-toggle='modal'
                data-bs-target='#authorModal'
              >
                了解更多
              </button>
            </div>
          </div>
        </div>

        <footer className='pt-3 mt-4 text-muted border-top'>
          &copy; 2022 Phoenix Chang
        </footer>
      </div>
      <div
        className='modal fade'
        id='introModal'
        tabIndex='-1'
        aria-labelledby='introModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title' id='introModalLabel'>
                網站基本功能介紹
              </h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <h5>網站主頁(Home)</h5>
              <p>介紹網站的功能</p>
              <hr />
              <h5>創建帳號</h5>
              <p>
                在「<a href='/signup'>Sign Up</a>
                」頁面用email創建個人帳號，以更深入探索本網站
              </p>
              <hr />
              <h5>帳號登入</h5>
              <p>
                在「<a href='/login'>Login</a>
                」頁面使用創建帳號時登錄的email與密碼登入
              </p>
              <hr />
              <h5>查找書籍</h5>
              <p>
                在「<a href='/search'>Search Book</a>
                」頁面，以輸入書名、書籍種類的方式查找書籍，並可觀看書籍的相關資料（作者、書籍介紹、價格、書籍種類、其他讀者的評價）
                <br />
                注意：「購買書籍」的動作必須要先以「使用者(user)」身份登入後才能執行
              </p>
              <hr />
              <h5>聲明</h5>
              <p>
                本網站的原生書籍資料及人名皆純屬虛構，無任何商用意圖，若有雷同，還請見諒
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='authorModal'
        tabIndex='-1'
        aria-labelledby='authorModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title' id='authorModalLabel'>
                「創作者(author)」身份功能介紹
              </h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <h5>個人檔案(Profile)</h5>
              <p>
                可在此頁面修改使用者的基本資料(使用者名稱、email)以及更改密碼
              </p>
              <hr />
              <h5>作品集(My Books)</h5>
              <p>可在此查看屬於自己的書籍，並可以對已上架的書籍內容作編輯</p>
              <hr />
              <h5>上架書籍(Post Book)</h5>
              <p>可在此頁面創建要上架的書籍</p>
              <hr />
              <h5>查找書籍(Search Book)</h5>
              <p>
                以輸入書名、書籍種類的方式查找書籍，並可觀看書籍的相關資料（作者、書籍介紹、價格、書籍種類、其他讀者的評價）
                <br />
                注意：「購買書籍」的動作必須要先以「使用者(user)」身份登入後才能執行
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='userModal'
        tabIndex='-1'
        aria-labelledby='userModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title' id='userModalLabel'>
                「使用者(user)」身份功能介紹
              </h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <h5>個人檔案(Profile)</h5>
              <p>
                可在此頁面修改使用者的基本資料(使用者名稱、email)以及更改密碼
              </p>
              <hr />
              <h5>作品集(My Books)</h5>
              <p>可在此查看屬於自己的書籍，並可以對這些書籍作評論</p>
              <hr />
              <h5>評論集(My Reviews)</h5>
              <p>可在此頁面查看撰寫過的評論，並可對內容進行修改</p>
              <hr />
              <h5>查找書籍(Search Book)</h5>
              <p>
                以輸入書名、書籍種類的方式查找書籍，並可觀看書籍的相關資料（作者、書籍介紹、價格、書籍種類、其他讀者的評價）
                <br />
                以「使用者(user)」身份登入後，可以執行「購買書籍」的動作來獲得書籍
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default homePage;
