import React from "react";
import { Link } from "react-router-dom";
import "../css/Login.css"
import googleimg from "../image/google_home.png"
import { useState } from "react";


function Login(){

  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  function IDPW(){
    console.log("아이디 : ",ID);
    console.log("비밀번호 : ",PW);

    setID("")
    setPW("")
  }


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
              <input type="text" name="ID" placeholder="ID 입력" value={ID} onChange={(e)=>setID(e.target.value)}/>
            </div>
            <div className="PW_div">
              <input type="password" name="PW" placeholder="PW 입력" value={PW} onChange={(e)=>setPW(e.target.value)}/>
            </div>
            <div className="login_complete">
              <button type="button" onClick={IDPW}>로그인</button>
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