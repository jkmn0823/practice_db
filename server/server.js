const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const sessionPath = path.join(__dirname, 'session');

// 세션 디렉토리 생성
if (!fs.existsSync(sessionPath)) {
    fs.mkdirSync(sessionPath, { recursive: true });
}

app.use(session({
    store: new FileStore({ path: sessionPath }), // 디렉토리 경로 설정
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.listen(5000, function() {
    console.log('5000번 포트 open');
});

// 세션 파일 삭제 함수
function clearSessionFiles() {
    if (!fs.existsSync(sessionPath)) {
        console.log('세션 디렉토리가 존재하지 않습니다.');
        return; // 디렉토리가 없으면 종료
    }

    fs.readdir(sessionPath, (err, files) => {
        if (err) {
            console.error('세션 파일 삭제 중 오류 발생:', err);
            return;
        }

        files.forEach(file => {
            fs.unlink(path.join(sessionPath, file), (err) => {
                if (err) {
                    console.error(`세션 파일 ${file} 삭제 실패:`, err);
                } else {
                    console.log(`세션 파일 ${file} 삭제 성공`);
                }
            });
        });
    });
}

// DB 정보
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'login_db'
});

// MySQL 연결 확인
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
    } else {
        console.log('MySQL 연결 성공!');
    }
});

// 회원가입 API
app.post('/register', async (req, res) => {
    const { name, id, password } = req.body;

    if (!name || !id || !password) {
        console.log('모든 칸을 채워주세요');
        return res.status(400).send();
    }

    const query = 'INSERT INTO user (name, id, password) VALUES (?, ?, ?)';
    db.query(query, [name, id, password], (err) => {
        if (err) {
            console.error('회원가입 중 에러 발생:', err);
            return res.status(500).send('서버 오류 발생');
        }
        res.status(201).send("회원가입 완료");
    });
});

// 로그인 API
app.post('/login', (req, res) => {
    const { id, password } = req.body;

    const Query = 'SELECT * FROM user WHERE id = ?';
    db.query(Query, [id], (err, result) => {
        if (err || result.length === 0) {
            console.log('유저를 찾을 수 없습니다');
            return res.status(400).send();
        }

        const user = result[0];

        if (password !== user.password) {
            console.log('비밀번호가 틀립니다.');
            return res.status(400).send();
        }

        // 로그인을 할 때는 세션 생성
        req.session.user = {
            id: user.id,
            name: user.name
        };

        res.status(200).send({
            message: '로그인 완료',
            user: {
                id: user.id,
                name: user.name
            }
        });
        console.log('로그인 완료');
        console.log('사용자 정보 ', user);
    });
});

// 로그아웃 API
app.post('/logout', (req, res) => {
    const user = req.session.user; // 현재 사용자 정보

    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('로그아웃 실패');
        }
        
        // 로그아웃 시 세션 파일 삭제
        clearSessionFiles();

        res.status(200).send('로그아웃 성공');
        console.log('로그아웃 완료');
        console.log('사용자 정보 ', user);
    });
});
