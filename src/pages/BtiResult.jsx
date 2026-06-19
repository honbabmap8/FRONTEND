import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/BtiResult.css";

export const LEVELS = {
  1: {
    badge: "LEVEL 1",
    title: "혼밥 초보자",
    subtitle: "혼자 밥 먹는게\n어색하고\n누구 눈치 보게 돼요.",
    features: [
      "메뉴 고르기\n어려워해요",
      "주변 시선이\n신경쓰여요",
      "뭐 먹을지\n고민이 많아요",
    ],
    quote: "처음은 누구나 어색해요.\n작은 한 끼부터 천천히 시작해봐요!",
    highlight: "천천히",
    stepLabel: "초보자",
    bgColor: "#fccba6",
    bgSize: "310%",
  },
  2: {
    badge: "LEVEL 2",
    title: "혼밥 입문자",
    subtitle: "혼자 먹는게\n조금씩 익숙해지고\n있는 중이에요.",
    features: [
      "단골 가게가\n생겼어요",
      "짧은 웨이팅은\n버텨요",
      "가끔은\n편하기도 해요",
    ],
    quote: "조금씩 나아지고 있어요.\n계속 도전해봐요!",
    highlight: "도전",
    stepLabel: "익숙해지는 중",
    bgColor: "#fccba6",
    bgSize: "180%",
  },
  3: {
    badge: "LEVEL 3",
    title: "혼밥 즐기는 편",
    subtitle: "혼자 먹는 시간을\n즐길 줄 알게 된\n여유로운 타입이에요.",
    features: [
      "새 가게\n도전해요",
      "웨이팅도\n괜찮아요",
      "혼자만의\n시간 즐겨요",
    ],
    quote: "이미 혼밥의 매력을 알고 있군요!\n더 넓은 세계가 기다려요.",
    highlight: "매력",
    stepLabel: "즐기는 편",
    bgColor: "#c4623a",
    bgSize: "250%",
  },
  4: {
    badge: "LEVEL 4",
    title: "혼밥 고수",
    subtitle: "혼밥을 즐기고\n어디든 당당하게\n혼자 들어가요.",
    features: [
      "파인다이닝도\n혼자 가요",
      "웨이팅\n두렵지 않아요",
      "혼밥 루틴이\n있어요",
    ],
    quote: "당신은 이미 고수예요.\n더 특별한 혼밥을 즐겨봐요!",
    highlight: "고수",
    stepLabel: "고수",
    bgColor: "#fccba6",
    bgSize: "250%",
  },
  5: {
    badge: "LEVEL 5",
    title: "혼밥 마스터",
    subtitle: "혼밥의 경지에\n오른 진정한\n마스터예요.",
    features: [
      "어디든\n혼자 가요",
      "오히려 혼자가\n더 좋아요",
      "혼밥 철학이\n있어요",
    ],
    quote: "당신은 혼밥 마스터!\n세상의 모든 맛집이 당신 것이에요.",
    highlight: "마스터",
    stepLabel: "미스터",
    bgColor: "#fccba6",
    bgSize: "160%",
  },
};

export const STEP_LABELS = [
  "초보자",
  "익숙해지는 중",
  "즐기는 편",
  "고수",
  "미스터",
];

const BtiResult = ({ authToken }) => {
  const { level } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token =
    authToken || location.state?.authToken || localStorage.getItem("token");
  const lv = parseInt(level) || 1;
  const data = LEVELS[lv] || LEVELS[1];

  return (
    <div className="result-page">
      {/* 배경 — 위로 당겨서 캐릭터 보이게 */}
      <div className={`result-bg result-bg--lv${lv}`}>
        <img
          src={`/image/level${lv}_back.svg`}
          alt=""
          className="result-bg-img"
        />

        {/* 배경 위 텍스트 */}
        <div className="result-bg-text">
          <span className="result-level-label">혼밥 레벨</span>
          <span className="result-badge">{data.badge}</span>
          <h1 className="result-title">{data.title}</h1>
          <p className="result-subtitle">{data.subtitle}</p>
        </div>
      </div>

      {/* 흰 카드 — 양옆 여백 있게 */}
      <div className="result-card">
        <p className="result-card-title">당신의 혼밥 상태</p>

        {/* 스텝 */}
        <div className="result-steps">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === lv;
            const isPast = stepNum < lv;
            return (
              <div key={i} className="result-step-item">
                {i > 0 && (
                  <div className={`result-step-line ${isPast ? "past" : ""}`} />
                )}
                <div
                  className={`result-step-circle ${isActive ? "active" : isPast ? "past" : ""}`}
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

        {/* 특징 박스 */}
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

        {/* 말풍선 */}
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

        {/* 버튼 */}
        <button
          className="result-btn"
          onClick={async () => {
            try {
              const res = await fetch("/api/users/signup/eatbti/result", {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (res.status === 401) {
                alert("로그인이 필요합니다.");
                navigate("/login");
                return;
              }
              if (!res.ok) {
                alert("서버 오류가 발생했습니다.");
                return;
              }

              // 결과 데이터 받아서 Map으로 이동 (level 파라미터 포함)
              const data = await res.json();
              navigate(`/map?level=${lv}`, { state: { resultData: data } });
            } catch (err) {
              alert("네트워크 오류가 발생했습니다.");
            }
          }}
        >
          <span>레벨에 맞는 맛집 추천 보기</span>
          <img src="/image/move.svg" alt="" className="result-btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default BtiResult;
