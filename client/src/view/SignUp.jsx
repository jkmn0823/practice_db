import { React,useState } from "react";
import '../css/SignUp.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp(){
  const [name,setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate 선언


  const handleSubmit = async(e) => {
    e.preventDefault();

    //백엔드 <-----------> 회원가입 데이터 전송
    try{
      const response = await axios.post('http://localhost:5000/register',{
        name, id, password
      });
    
    // 성공적으로 회원가입이 완료된 경우
    if (response.status === 201) {
      alert('회원가입이 완료되었습니다.'); // 성공 메시지
      navigate('/login'); // /login 페이지로 이동
    }
  } catch (error) {
    alert('올바른 정보를 입력해주세요');
  }
};

  




  return(
    <div className="back">
      <header className="header">
        <div className="header_box">
{/*  */}
        </div>
      </header>
      <div className="content">
        <div className="login_box">
          <div className="sign_tittle">
            <h1>회원가입</h1>
          </div>
          <form action="" className="sign_form">
            <div className="sign_Name">
              <p>이름</p>
              <input type="text" placeholder="이름" value={name}onChange={(e)=>{setName(e.target.value)}} />
            </div>
            <div className="sign_ID">
              <p>ID</p>
              <input type="text" placeholder="사용할 아이디를 입력해주세요" value={id} onChange={(e)=>{setId(e.target.value)}}/>
            </div>
            <div className="sign_PW">
              <p>비밀번호</p>
              <input type="password" placeholder="기호포함 8자를 입력해주세요" onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>

            <button type="submit" onClick={handleSubmit}>확인</button>
          </form>

        </div>
      </div>
    </div>
  )
};

export default SignUp