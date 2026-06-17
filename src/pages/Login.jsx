import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ id: "", password: "" });
  const [keepLogin, setKeepLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canLogin = form.id.trim() && form.password;

  const handleLogin = () => {
    if (!canLogin) return;
    alert("로그인 API 연동 예정");
  };

  return (
    <div className="container login-container">
      <header className="login-header">
        <button className="login-back" onClick={() => navigate(-1)}>
          <img src="/image/backBtn.svg" alt="뒤로가기" />
        </button>
      </header>

      <div className="login-body">
        <div className="login-logo-wrap">
          <img
            src="../../image/logo.svg"
            alt="로고"
            className="login-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="login-logo-placeholder">로고</div>
        </div>

        <p className="login-app-name">어플명적고</p>

        <div className="login-form">
          <input
            type="text"
            name="id"
            className="login-input"
            placeholder="이메일 주소 또는 아이디"
            value={form.id}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="패스워드"
            value={form.password}
            onChange={handleChange}
          />

          <label className="login-keep" onClick={() => setKeepLogin((v) => !v)}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              style={{ flexShrink: 0 }}
            >
              <rect
                x="1"
                y="1"
                width="18"
                height="18"
                rx="3"
                fill={keepLogin ? "#E7795D" : "#fff"}
                stroke={keepLogin ? "#E7795D" : "#bbb"}
                strokeWidth="1.5"
              />
              {keepLogin && (
                <polyline
                  points="4.5,10 8.5,14 15.5,6"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
            <span>로그인 상태 유지</span>
          </label>

          <button
            className={`login-btn ${canLogin ? "enabled" : ""}`}
            disabled={!canLogin}
            onClick={handleLogin}
          >
            로그인
          </button>

          <div className="login-links">
            <button
              className="login-link"
              onClick={() => alert("아이디 찾기 준비 중")}
            >
              아이디 찾기
            </button>
            <span className="login-divider">|</span>
            <button
              className="login-link"
              onClick={() => alert("비밀번호 재설정 준비 중")}
            >
              비밀번호 재설정
            </button>
            <span className="login-divider">|</span>
            <button
              className="login-link"
              onClick={() => navigate("/register")}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
