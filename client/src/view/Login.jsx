import React from "react";
import { Link , useNavigate } from "react-router-dom";
import "../css/Login.css"
import googleimg from "../image/google_home.png"
import { useState } from "react";
import axios from "axios";


function Login({setUserName}){

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 백엔드 <-----------> 로그인 데이터 전송
    try {
      const response = await axios.post('http://localhost:5000/login', {
        id,
        password
      });

      // 성공적으로 로그인 완료된 경우
      if (response.status === 200) {
        setUserName(response.data.user.name); // 사용자 정보 받아온다. 
        alert('로그인에 성공했습니다.'); // 성공 메시지
        navigate('/'); // 로그인 후 이동할 페이지
      }
    } catch (error) {
      if(!id || !password){
        alert('아이디 또는 비밀번호를 입력해주세요')
      }
    }
  };


  return(
    <div className="back">
      <header className="header">
        <div className="header_box">
          <img src={googleimg} alt="Google Home" />
        </div>
      </header>
      <div className="content">
        <div className="login_box">
          <form action=""> {/**백엔드로 전해지는 url */}
            <div className="ID_div">
              <input type="text" name="ID" placeholder="ID 입력" value={id} onChange={(e)=>setId(e.target.value)}/>
            </div>
            <div className="PW_div">
              <input type="password" name="PW" placeholder="PW 입력" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="login_complete">
              <button type="button" onClick={handleLogin}>로그인</button>
            </div>
          </form>
          <div className="next">
            <Link to="/SignUp" className="next_page_acc">회원이 아니신가요?</Link>
          </div>
        </div>
      </div>
      <div className="footer">
        {/* <h3>하나둘셋</h3> */}
      </div>
    </div>
  );
}

export default Login;