import React from "react";
import { Link } from "react-router-dom";

import '../css/Header.css';

function Header(){
  return(
    <div className="Header">
      <h1><Link to="/" className="">홈</Link></h1>
      <h1><Link to="/Login" className="">로그인</Link></h1>
      <h1><Link to="/SignUp" className="">회원가입</Link></h1>
    </div>
  )
};

export default Header;