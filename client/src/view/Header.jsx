import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import '../css/Header.css';

function Header({ user, onLogout }) {
  const [name,setName] = useState('비회원');

  useEffect(()=>{
    if(user){
      setName(user)
    } else{
      setName('비회원');
    }
  },[user])

  return (
    <div className="Header">
      <h1><Link to="/" className="">홈</Link></h1>
      {name === '비회원' ? (
                <h1><Link to="/Login">로그인</Link></h1>
            ) : (
                <h1 onClick={onLogout} >로그아웃</h1>
            )}
      <h1>{name}</h1>
      <h1><Link to="/SignUp" className="">회원가입</Link></h1>
    </div>
  );
}

export default Header;
