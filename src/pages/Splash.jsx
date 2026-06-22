import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Splash.css";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-page">
      <div className="splash-container">
        {/* 캐릭터 로고 */}
        <img
          src="/image/main_logo.svg"
          alt="잇비티아이 로고"
          className="splash-logo"
        />
        {/* 타이틀 텍스트 로고 */}
        <img
          src="/image/main_logo_name.svg"
          alt="잇비티아이"
          className="splash-logo-name"
        />
      </div>
    </div>
  );
};

export default Splash;
