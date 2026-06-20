import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/LoadingResult.css";

const LoadingResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  const { answers, authToken, targetLevel } = location.state || {};

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        navigate(`/bti/result/${targetLevel || 1}`, {
          state: { authToken },
        });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const messages = [
    "당신의 성향을 분석하고",
    "맞춤 인사이트를 준비하고 있어요.",
  ];

  return (
    <div className="loading-page">
      <p className="loading-title">
        모든 질문 완료!
        <br />
        잠시만 기다려주세요
      </p>

      <div className="loading-icon-wrap">
        <img
          src="/image/loadingIcon.svg"
          alt="로딩 캐릭터"
          className="loading-icon"
        />
      </div>

      <div className="loading-bar-section">
        <div className="loading-bar-header">
          <span className="loading-bar-label">결과 분석 중 ....</span>
          <span className="loading-bar-percent">{progress}%</span>
        </div>
        <div className="loading-bar-bg">
          <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <p className="loading-desc">
        {messages[0]}
        <br />
        {messages[1]}
      </p>
    </div>
  );
};

export default LoadingResult;
