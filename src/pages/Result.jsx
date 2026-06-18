import { useNavigate, useSearchParams } from "react-router-dom";
import ResultImg from "../assets/eatbti1_result5.png";
import { LEVELS, STEP_LABELS } from "./BtiResult";
import "../styles/BtiResult.css";
import "../styles/Result.css";

function Result() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lv = parseInt(searchParams.get("level"), 10) || 5;
  const data = LEVELS[lv] || LEVELS[5];

  return (
    <div className="container">
      <div className="result">
        <img className="result-main-img" src={ResultImg} alt="result" />

        <div className="result-card">
          <p className="result-card-title">당신의 혼밥 상태</p>

          <div className="result-steps">
            {STEP_LABELS.map((label, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === lv;
              const isPast = stepNum < lv;

              return (
                <div key={label} className="result-step-item">
                  {i > 0 && (
                    <div className={`result-step-line ${isPast ? "past" : ""}`} />
                  )}
                  <div
                    className={`result-step-circle ${
                      isActive ? "active" : isPast ? "past" : ""
                    }`}
                  >
                    {stepNum}
                  </div>
                  <span
                    className={`result-step-label ${isActive ? "active" : ""}`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="result-feature-box">
            <p className="result-feature-title">{data.stepLabel} 특징</p>
            <div className="result-feature-divider" />
            <div className="result-features">
              {[1, 2, 3].map((n) => (
                <div key={n} className="result-feature-item">
                  <img
                    src={`/image/level${lv}_${n}.svg`}
                    alt=""
                    className="result-feature-img"
                  />
                  <p className="result-feature-text">{data.features[n - 1]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="result-quote">
            <span className="result-quote-mark">"</span>
            <p className="result-quote-text">
              {data.quote.split(data.highlight).map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="result-highlight">{data.highlight}</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </p>
            <span className="result-quote-mark result-quote-mark-end">"</span>
          </div>

          <button
            className="result-btn"
            type="button"
            onClick={() => navigate(`/map?level=${lv}`)}
          >
            <span>레벨에 맞는 맛집 추천 보기</span>
            <img src="/image/move.svg" alt="" className="result-btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
