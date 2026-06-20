import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Review.css";
import BottomNav from "../component/BottomNav";

const API_URL = import.meta.env.VITE_API_URL;

const KEYWORDS = {
  "혼밥 정도": [
    { id: 1, label: "🪑 혼자 앉기 편해요" },
    { id: 2, label: "😵‍💫 눈치 안 보여요" },
    { id: 3, label: "🌙 늦게까지 해요" },
    { id: 4, label: "☝️ 조용해서 좋아요" },
    { id: 5, label: "🍴 회전이 빨라요" },
    { id: 6, label: "📍 식탁 간격이 넓어요" },
  ],
  "메뉴 / 서비스": [
    { id: 7, label: "🍱 메뉴가 다양해요" },
    { id: 8, label: "💰 가성비가 좋아요" },
    { id: 9, label: "🏃‍♀️ 포장도 가능해요" },
    { id: 10, label: "🍽️ 1인 메뉴가 있어요" },
    { id: 11, label: "🥣 양이 적당해요" },
    { id: 12, label: "🧍‍♀️ 웨이팅이 없어요" },
  ],
};

// 상위에서 정적으로 관리하던 authToken 제거
const Review = ({ defaultRestaurantId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const store = location.state?.store || {
    restaurantId: defaultRestaurantId,
    name: "콘콘",
    date: "2026. 06. 22 (월)",
    visitCount: 3,
  };
  const restaurantId = store.restaurantId ?? defaultRestaurantId;

  const [liked, setLiked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleKeyword = (tagId) => {
    setSelected((prev) => {
      const next = prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : prev.length < 5
          ? [...prev, tagId]
          : prev;

      console.log("[Review] selectedTagsArray:", next);
      return next;
    });
  };

  const handleSubmit = async () => {
    if (selected.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const url = `/api/restaurants/${restaurantId}/reviews`;
      const payload = {
        selectedTagsArray: selected,
      };

      console.log("[Review] POST", url);
      console.log("[Review] request body:", payload);

      // 로컬스토리지에서 로그인 성공 시 세팅했던 진짜 토큰 수집
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}${url}`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          // ✨ 하드코딩된 변수 대신 브라우저 저장소의 실제 토큰을 실시간으로 반영
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Review] response status:", response.status);
        console.error("[Review] response body:", errorText);
        throw new Error("리뷰 등록에 실패했습니다.");
      }

      const responseText = await response.text();
      console.log("[Review] response status:", response.status);
      console.log("[Review] response body:", responseText);

      alert("리뷰가 등록되었습니다.");
      navigate(-1);
    } catch (error) {
      alert(error.message || "리뷰 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-page">
      {/* ── 가게 헤더  ── */}
      <div className="review-store-header">
        <img
          src="/image/review_character.svg"
          alt="store-icon"
          className="review-store-avatar"
        />
        <div className="review-store-meta">
          <p className="review-store-name">{store.name}</p>
          <p className="review-store-date">
            {store.date} {store.visitCount}번째 방문
          </p>
        </div>
      </div>

      {/* ── 본문 스크롤 영역 ── */}
      <div className="review-body">
        <div className="review-like-card">
          <p className="review-like-title">이 곳이 마음에 든다면,</p>
          <p className="review-like-sub">
            좋아요를 누르고 취향에 맞는
            <br />
            가게를 추천받으세요.
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
                      key={kw.id}
                      className={`review-keyword-chip ${selected.includes(kw.id) ? "active" : ""}`}
                      onClick={() => toggleKeyword(kw.id)}
                    >
                      {kw.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`review-submit ${selected.length > 0 ? "enabled" : ""}`}
          disabled={selected.length === 0 || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "등록 중..." : "리뷰 등록"}
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Review;
