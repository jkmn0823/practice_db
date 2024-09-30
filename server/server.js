//npx nodemon server.js
const express = require('express');
const app = express();

app. listen(5000, function(){
    console.log('5000번 포트 open')
});              // 5000port에서 열다.


app.get('/',function(req, res){
    res.send('반갑습니다.')
}); // 누군가 /로 방문하면 send()안내문을 띄워줌

