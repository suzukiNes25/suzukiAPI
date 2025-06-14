import React, { useState } from 'react';

const API_ENDPOINT1 = 'https://8j5yfns1n6.execute-api.ap-northeast-1.amazonaws.com/function-Suzuki1';
const API_ENDPOINT2 = 'https://8j5yfns1n6.execute-api.ap-northeast-1.amazonaws.com/function-Suzuki2';
const API_ENDPOINT3 = 'https://8j5yfns1n6.execute-api.ap-northeast-1.amazonaws.com/function-Suzuki3';
const API_ENDPOINT4 = 'https://8j5yfns1n6.execute-api.ap-northeast-1.amazonaws.com/function-SuzukiPOST';

function App() {
  const [result, setResult] = useState('結果がここに表示されます');
  const [loadingButton, setLoadingButton] = useState('');

  const callLambda = async (endpoint, buttonId) => {
    setLoadingButton(buttonId);
    setResult('読み込み中...');
    try {
      const response = await fetch(endpoint);
      const data = await response.text();
      setResult(data);
    } catch (error) {
      setResult('エラーが発生しました: ' + error.message);
    } finally {
      setLoadingButton('');
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-logo">MicroService</div>
        <div className="user-info">
          <div className="user-icon">S</div>
          Student
        </div>
      </header>

      <div className="main-content">
        <div className="container">
          <h1>AWS Lambda Demo</h1>
          <div className="button-container">
            <button
              onClick={() => callLambda(API_ENDPOINT1, 'b1')}
              disabled={loadingButton === 'b1'}
              className={loadingButton === 'b1' ? 'loading' : ''}
            >
              メッセージ1を取得
            </button>
            <button
              onClick={() => callLambda(API_ENDPOINT2, 'b2')}
              disabled={loadingButton === 'b2'}
              className={loadingButton === 'b2' ? 'loading' : ''}
            >
              メッセージ2を取得
            </button>
            <button
              onClick={() => callLambda(API_ENDPOINT3, 'b3')}
              disabled={loadingButton === 'b3'}
              className={loadingButton === 'b3' ? 'loading' : ''}
            >
              メッセージ3を取得
            </button>
            <button
              onClick={() => callLambda(API_ENDPOINT4, 'b4')}
              disabled={loadingButton === 'b4'}
              className={loadingButton === 'b4' ? 'loading' : ''}
            >
              メッセージ4を取得
            </button>
          </div>
          <div id="result" className={result !== '' ? 'active' : ''}>
            {result}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
