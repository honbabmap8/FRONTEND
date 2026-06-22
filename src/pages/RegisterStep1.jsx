import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";



const Checkbox = ({ checked, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    style={{ flexShrink: 0, cursor: "pointer" }}
  >
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="3"
      fill={checked ? "#E7795D" : "#fff"}
      stroke={checked ? "#E7795D" : "#bbb"}
      strokeWidth="1.5"
    />
    {checked && (
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
);

const RegisterStep1 = () => {
  const navigate = useNavigate();
  const [checks, setChecks] = useState({
    terms: false,
    privacy: false,
    marketing: false,
    email: false,
  });

  const allChecked =
    checks.terms && checks.privacy && checks.marketing && checks.email;

  const toggleAll = () => {
    const next = !allChecked;
    setChecks({ terms: next, privacy: next, marketing: next, email: next });
  };

  const toggle = (key) => {
    setChecks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === "marketing") next.email = next.marketing;
      return next;
    });
  };

  const canProceed = checks.terms && checks.privacy;

  return (
    <div className="container">
      <header className="reg-header">
        <button className="reg-back" onClick={() => navigate(-1)}>
          <img src="/image/backBtn.svg" alt="뒤로가기" />
        </button>
        <span className="reg-title">회원가입</span>
        <button className="reg-home" onClick={() => navigate("/")}>
          <img src="/image/homeBtn.svg" alt="홈" />
        </button>
      </header>

      <div className="reg-body">
        <h2 className="reg-welcome">
          <img
            src="../../image/logo_name.svg"
            alt="로고"
            className="login-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span>에 오신 걸</span>
          <br />
          <span>환영합니다!</span>
        </h2>

        <div className="reg-steps">
          <div className="step active">
            <div className="step-circle active">1</div>
            <span className="step-label">약관동의</span>
          </div>
          <div className="step-line" />
          <div className="step">
            <div className="step-circle">2</div>
            <span className="step-label">정보입력</span>
          </div>
          <div className="step-line" />
          <div className="step">
            <div className="step-circle">3</div>
            <span className="step-label">검사 시작</span>
          </div>
        </div>

        <div className="terms-box">
          <label className="terms-all" onClick={toggleAll}>
            <Checkbox checked={allChecked} size={22} />
            <span className="terms-all-text">약관 전체 동의하기</span>
          </label>
          <div className="terms-list">
            <label className="terms-item" onClick={() => toggle("terms")}>
              <Checkbox checked={checks.terms} />
              <span>이용약관</span>
            </label>
            <label className="terms-item" onClick={() => toggle("privacy")}>
              <Checkbox checked={checks.privacy} />
              <span>[필수] 개인정보 수집/ 이용 동의</span>
            </label>
            <label className="terms-item" onClick={() => toggle("marketing")}>
              <Checkbox checked={checks.marketing} />
              <span>[선택] 광고성 정보 수신 동의</span>
            </label>
            <div className="terms-sub">
              <label className="terms-item" onClick={() => toggle("email")}>
                <Checkbox checked={checks.email} />
                <span>이메일(DM)</span>
              </label>
              <p className="terms-desc">
                맵에서 제공하는 신상품 소식/할인쿠폰을 무상으로 보내드립니다.
                <br />
                단, 상품 구매 정보는 수신동의 여부 관계없이 발송됩니다.
                <br />
                제공 동의를 하지 않으셔도 서비스 이용에는 문제가 없습니다.
              </p>
            </div>
          </div>
        </div>

        <button
          className={`reg-btn ${canProceed ? "enabled" : ""}`}
          disabled={!canProceed}
          onClick={() => navigate("/register/step2")}
        >
          다음단계
        </button>
      </div>

   
    </div>
  );
};

export default RegisterStep1;
