// ═══════════════════════════════════════════════════════
//  FIREBASE CONFIG — 填入你的 Firebase 專案設定
//  1. 前往 https://console.firebase.google.com
//  2. 建立專案 → 新增 Web App → 複製 firebaseConfig
//  3. 開啟 Realtime Database（測試模式即可）
//  4. 將下方所有 "YOUR_..." 換成你的實際值
// ═══════════════════════════════════════════════════════
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL:       "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com/",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// 調查頁面的公開網址（deploy 到 GitHub Pages 後填入）
// 格式：https://你的帳號.github.io/你的repo名/survey.html
const SURVEY_URL = "https://hallowjason.github.io/vote-presentation/survey.html";
