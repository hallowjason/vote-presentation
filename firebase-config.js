// ═══════════════════════════════════════════════════════
//  FIREBASE CONFIG — 填入你的 Firebase 專案設定
//  1. 前往 https://console.firebase.google.com
//  2. 建立專案 → 新增 Web App → 複製 firebaseConfig
//  3. 開啟 Realtime Database（測試模式即可）
//  4. 將下方所有 "YOUR_..." 換成你的實際值
// ═══════════════════════════════════════════════════════
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDsSLcet2x574mrj9fppNVVJ_7DFHVLl-8",
  authDomain:        "vote-presentation.firebaseapp.com",
  databaseURL:       "https://vote-presentation-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "vote-presentation",
  storageBucket:     "vote-presentation.firebasestorage.app",
  messagingSenderId: "200556877101",
  appId:             "1:200556877101:web:3f9053ac1d4e20b2e6efa4"
};

// 調查頁面的公開網址（deploy 到 GitHub Pages 後填入）
// 格式：https://你的帳號.github.io/你的repo名/survey.html
const SURVEY_URL = "https://hallowjason.github.io/vote-presentation/survey.html";
