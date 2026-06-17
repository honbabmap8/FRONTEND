import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Review.css";
import BottomNav from "../component/BottomNav";

const KEYWORDS = {
  "혼밥 정도": [
    "🪑 혼자 앉기 편해요",
    "😵‍💫 눈치 안 보여요",
    "🌙 늦게까지 해요",
    "☝️ 조용해서 좋아요",
    "🍴 회전이 빨라요",
    "📍 식탁 간격이 넓어요",
  ],
  "메뉴 / 서비스": [
    "🍱 메뉴가 다양해요",
    "💰 가성비가 좋아요",
    "🏃‍♀️ 포장도 가능해요",
    "🍽️ 1인 메뉴가 있어요",
    "🥣 양이 적당해요",
    "🧍‍♀️ 웨이팅이 없어요",
  ],
};

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const store = location.state?.store || {
    name: "콘콘",
    date: "2026. 05. 23 (일)",
    visitCount: 3,
  };

  const [liked, setLiked] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleKeyword = (kw) => {
    setSelected((prev) =>
      prev.includes(kw)
        ? prev.filter((k) => k !== kw)
        : prev.length < 5
          ? [...prev, kw]
          : prev,
    );
  };

  const handleSubmit = () => {
    // liked === true 면 마이페이지 단골가게에 추가
    alert("리뷰 제출됨 (API 연동 예정)");
    navigate(-1);
  };

  return (
    <div className="review-page">
      <div className="review-body">
        <div className="review-store-header">
          <div className="review-store-img-wrap">
            <div className="review-store-img-placeholder" />
          </div>
          <div className="review-store-meta">
            <p className="review-store-name">{store.name}</p>
            <p className="review-store-date">
              {store.date}　{store.visitCount}번째 방문
            </p>
          </div>
        </div>

        <div className="review-like-card">
          <p className="review-like-title">이 곳이 마음에 든다면,</p>
          <p className="review-like-sub">
            좋아요를 누르고 취향이 비슷한
            <br />
            사람을 추천받으세요.
          </p>
          <button
            className={`review-like-btn ${liked ? "liked" : ""}`}
            onClick={() => setLiked((v) => !v)}
          >
            {liked ? "❤️ 좋아요!" : "이런 곳 좋아요!"}
          </button>
        </div>

        <div className="review-keyword-card">
          <p className="review-keyword-title">어떤 점이 좋았나요?</p>
          <p className="review-keyword-sub">
            이곳에 어울리는 키워드를 골라주세요.(1~5개)
          </p>

          <div className="review-keyword-groups">
            {Object.entries(KEYWORDS).map(([group, kws]) => (
              <div key={group} className="review-keyword-group">
                <p className="review-keyword-group-label">{group}</p>
                <div className="review-keyword-list">
                  {kws.map((kw) => (
                    <button
                      key={kw}
                      className={`review-keyword-chip ${selected.includes(kw) ? "active" : ""}`}
                      onClick={() => toggleKeyword(kw)}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`review-submit ${selected.length > 0 ? "enabled" : ""}`}
          disabled={selected.length === 0}
          onClick={handleSubmit}
        >
          제보 완료
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Review;
