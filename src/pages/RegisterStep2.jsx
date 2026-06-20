import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import BottomNav from "../component/BottomNav";
import { useRegister } from "../context/RegisterContext";

const API_URL = import.meta.env.VITE_API_URL;


const RegisterStep2 = () => {
  const navigate = useNavigate();
  const { formData, updateForm } = useRegister();
  const form = formData;

  const formatPhone = (value) => {
    const nums = value.replace(/\D/g, "");
    if (nums.length <= 3) return nums;
    if (nums.length <= 7) return `${nums.slice(0, 3)}-${nums.slice(3)}`;
    return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      updateForm("phone", formatPhone(value));
      return;
    }
    updateForm(name, value);
  };

  const idError = (() => {
    if (!form.id) return "";
    if (!/^[a-zA-Z0-9]*$/.test(form.id))
      return "영문 + 숫자 조합으로만 사용 가능";
    if (!/[a-zA-Z]/.test(form.id) || !/[0-9]/.test(form.id))
      return "영문 + 숫자를 모두 포함해야 합니다";
    return "";
  })();

  const idValid = form.id && !idError;

  const canSubmit =
    idValid &&
    form.password.length >= 8 &&
    form.passwordConfirm &&
    form.name &&
    form.phone.replace(/\D/g, "").length >= 10 &&
    form.password === form.passwordConfirm;

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
          <div className="step done">
            <div className="step-circle done">1</div>
            <span className="step-label">약관동의</span>
          </div>
          <div className="step-line active" />
          <div className="step active">
            <div className="step-circle active">2</div>
            <span className="step-label">정보입력</span>
          </div>
          <div className="step-line" />
          <div className="step">
            <div className="step-circle">3</div>
            <span className="step-label">검사 시작</span>
          </div>
        </div>

        <div className="info-form">
          <h3 className="info-form-title">정보입력</h3>

          <div className="form-row">
            <label className="form-label">아이디</label>
            <div className="form-input-wrap">
              <input
                type="text"
                name="id"
                className={`form-input ${idError ? "error" : ""}`}
                value={form.id}
                onChange={handleChange}
              />
              <span className={`form-hint ${idError ? "form-error" : ""}`}>
                {idError || "영문 + 숫자 조합으로만 사용 가능"}
              </span>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">비밀번호</label>
            <div className="form-input-wrap">
              <input
                type="password"
                name="password"
                className="form-input"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label confirm">비밀번호 확인</label>
            <div className="form-input-wrap">
              <input
                type="password"
                name="passwordConfirm"
                className={`form-input ${form.passwordConfirm && form.password !== form.passwordConfirm ? "error" : ""}`}
                value={form.passwordConfirm}
                onChange={handleChange}
              />
              {form.passwordConfirm &&
                form.password !== form.passwordConfirm && (
                  <span className="form-hint form-error">
                    비밀번호가 일치하지 않습니다
                  </span>
                )}
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">이름</label>
            <div className="form-input-wrap">
              <input
                type="text"
                name="name"
                className="form-input"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">연락처</label>
            <div className="form-input-wrap">
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="010-0000-0000"
                value={form.phone}
                onChange={handleChange}
                maxLength={13}
              />
            </div>
          </div>
        </div>

        <button
          className={`reg-btn ${canSubmit ? "enabled" : ""}`}
          disabled={!canSubmit}
          onClick={async () => {
            try {
              const res = await fetch(`${API_URL}/users/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  loginId: form.id,
                  nickname: form.name,
                  password: form.password,
                }),
              });

              if (res.status === 400) {
                alert("입력값을 확인해주세요.");
                return;
              }
              if (res.status === 409) {
                alert("이미 사용 중인 아이디입니다.");
                return;
              }
              if (!res.ok) {
                alert("서버 오류가 발생했습니다.");
                return;
              }

              alert("회원가입이 완료되었습니다. 로그인을 진행해 주세요.");
              navigate("/login");
            } catch (err) {
              alert("네트워크 오류가 발생했습니다.");
            }
          }}
          style={{ marginBottom: "96px" }}
        >
          다음단계
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default RegisterStep2;
