// app.js

import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// 로깅
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// JSON 처리
app.use(express.json());

// 권한 확인
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "권한 없음" });
  }

  next();
};

// 기본 라우터
app.get("/", (req, res) => {
  res.send("서버 실행 중");
});

// POST 요청
app.post("/posts", checkAuth, (req, res) => {
  res.status(201).json({
    message: "생성 완료",
    data: req.body,
  });
});

// 에러 처리
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "서버 오류" });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
