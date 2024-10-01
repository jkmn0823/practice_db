import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './view/Login';
import Home from './view/Home';
import Header from './view/Header';
import SignUp from './view/SignUp';

function App() {
  const [username, setUserName] = useState('');

   // 로그아웃 함수
  const Logout = async () => {
    try {
        await axios.post('http://localhost:5000/logout'); // 서버에 로그아웃 요청
        setUserName('비회원'); // 클라이언트 상태 초기화
    } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
    }
};



  return (
    <BrowserRouter>
      <Header user={username} onLogout={Logout}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login setUserName={setUserName} />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
