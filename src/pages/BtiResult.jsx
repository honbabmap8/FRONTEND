import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/BtiResult.css";
const API_URL = import.meta.env.VITE_API_URL;

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
    title: "혼밥 익숙해지는 중",
    subtitle: "조금씩\n혼밥이 익숙해지고\n주변 시선도\n덜 신경 쓰여요.",
    features: [
      "혼밥이\n어색하지 않아요",
      "할 일 하면서\n혼밥이 가능해요",
      "혼밥할 맛집을\n고민하곤 해요",
    ],
    quote:
      "혼밥이 더 이상 어색하지 않아요.\n이제는 나만의 시간을 즐길 줄 알아요!",
    highlight: "나만의 시간을 즐길 줄 알아요!",
    stepLabel: "익숙해지는 중",
    bgColor: "#fccba6",
    bgSize: "180%",
  },
  3: {
    badge: "LEVEL 3",
    title: "혼밥 즐기는 편",
    subtitle: "혼밥이 자연스럽고\n나만의 시간을\n즐길 줄 알아요.",
    features: [
      "혼밥이\n익숙해졌어요",
      "밥 먹으며\n여유를 즐겨요",
      "혼밥 맛집을\n저장해요",
    ],
    quote: "혼밥은 나를 위한 작은 힐링 시간이에요.\n나만의 속도로 즐겨보세요!",
    highlight: "나만의 속도로 즐겨보세요!",
    stepLabel: "즐기는 편",
    bgColor: "#c4623a",
    bgSize: "250%",
  },
  4: {
    badge: "LEVEL 4",
    title: "혼밥 고수",
    subtitle: "맛집 탐방부터\n나만의 루틴까지\n완벽해요.",
    features: [
      "혼자여도\n완벽하게 즐겨요",
      "혼밥 루틴이\n완벽해요",
      "새로운 맛집을\n찾는 게 즐거워요",
    ],
    quote: "혼밥은 나를 위한 최고의 선택이에요.\n여기 내 단골집이야!",
    highlight: "여기 내 단골집이야!",
    stepLabel: "고수",
    bgColor: "#fccba6",
    bgSize: "250%",
  },
  5: {
    badge: "LEVEL 5",
    title: "혼밥 마스터",
    subtitle: "혼자서도\n맛있게, 멋지게, 완벽하게\n즐겨요!",
    features: [
      "나만의 단골\n맛집이 있어요",
      "혼자서도 맛있게\n완벽하게 즐겨요",
      "혼밥이 최고의\n힐링 시간 이에요",
    ],
    quote: "어디서든 당당하게 혼밥해요.\n혼밥이 가장 편한 일상이 되었어요!",
    highlight: "혼밥이 가장 편한 일상이 되었어요!",
    stepLabel: "마스터",
    bgColor: "#fccba6",
    bgSize: "160%",
  },
};

export const STEP_LABELS = [
  "초보자",
  "익숙해지는 중",
  "즐기는 편",
  "고수",
  "마스터",
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
              const res = await fetch(`${API_URL}/users/signup/eatbti/result`, {
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

              // 결과 데이터 받아서 Home으로 이동 (level 파라미터 포함)
              const data = await res.json();
              navigate("/Home", { state: { btiLevel: lv, resultData: data } });
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
