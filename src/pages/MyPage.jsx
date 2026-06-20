import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyPage.css";
import BottomNav from "../component/BottomNav";

const LEVEL_LABELS = {
  1: "혼밥 초보자",
  2: "익숙해지는 중",
  3: "혼밥 즐기는 중",
  4: "혼밥 고수",
  5: "혼밥 마스터",
};

// 단골가게 더미 데이터
const MOCK_FAVORITES = [
  {
    id: 1,
    name: "101번지남산돈까스 삼각지점",
    menu: "돈까스누들맵떡, 남산치킨까스",
    distance: "47",
    area: "삼각지역",
    level: 2,
    tags: ["혼밥 만족도 높음", "1인 메뉴 가능"],
    image: "/image/store1.png",
  },
  {
    id: 2,
    name: "부국정",
    menu: "양곰탕, 한우육회비빔밥",
    distance: "110",
    area: "삼각지역",
    level: 3,
    tags: ["1인석 있음", "조용한 분위기"],
    image: "/image/store2.jpeg",
  },
  {
    id: 3,
    name: "마토미",
    menu: "수아데로 타코, 트리파스 타코",
    distance: "190",
    area: "삼각지역",
    level: 5,
    tags: ["1인 메뉴 가능", "조용한 분위기"],
    image: "/image/store3.jpeg",
  },
];

const MENUS = [
  { icon: "/image/icon_reservation.svg", label: "예약 관리" },
  { icon: "/image/icon_activity.svg", label: "내 활동" },
  { icon: "/image/icon_cs.svg", label: "고객센터" },
  { icon: "/image/icon_event.svg", label: "이벤트" },
];

const MyPage = () => {
  const navigate = useNavigate();

  const user = {
    name: localStorage.getItem("nickname") || "사용자",
    level: Number(localStorage.getItem("honbabLevel")) || 1,
  };

  const favorites = MOCK_FAVORITES;
  const isEmpty = favorites.length === 0;

  return (
    <div className="mypage-page">
      <div className="mypage-body">
        {/* 프로필 영역: 로그인 데이터 동적 반영 */}
        <div className="mypage-profile">
          <img
            src="/image/mypage_character.svg"
            alt="캐릭터"
            className="mypage-character"
          />
          <div className="mypage-info">
            <p className="mypage-name">
              <strong>{user.name}</strong>님
            </p>
            <p className="mypage-desc">오늘도 맛있는 혼밥 하세요!</p>
            <p className="mypage-level">
              혼밥 레벨{" "}
              <span className="mypage-level-num">Lv.{user.level}</span>{" "}
              {LEVEL_LABELS[user.level] || "혼밥 탐험가"}
            </p>
          </div>
        </div>

        <div className="mypage-menus">
          {MENUS.map((m, i) => (
            <button
              key={i}
              className="mypage-menu-item"
              onClick={() => alert(`${m.label} 준비 중`)}
            >
              <img
                src={m.icon}
                alt={m.label}
                className={`mypage-menu-icon ${m.className || ""}`}
              />
              <span className="mypage-menu-label">{m.label}</span>
            </button>
          ))}
        </div>

        <div className="mypage-fav-box">
          <div className="mypage-fav-header">
            <span className="mypage-fav-title">단골가게</span>
            <button
              className="mypage-fav-add"
              onClick={() => navigate("/review")}
            >
              <img
                src="/image/icon_plus.svg"
                alt="추가"
                className="mypage-fav-plus-icon"
              />
            </button>
          </div>
          <div className="mypage-fav-divider" />

          {isEmpty ? (
            <div className="mypage-empty">
              <img
                src="/image/mypage_empty.svg"
                alt=""
                className="mypage-empty-img"
              />
              <p className="mypage-empty-text">아직 등록한 단골가게가 없어요</p>
              <p className="mypage-empty-sub">
                자주 가는 혼밥 맛집을 추가해보세요!
              </p>
              <button
                className="mypage-empty-btn"
                onClick={() => navigate("/review")}
              >
                단골 가게 추가하기
              </button>
            </div>
          ) : (
            <div className="mypage-fav-list">
              {favorites.map((store) => (
                <div key={store.id} className="mypage-store-item">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="mypage-store-img"
                  />
                  <div className="mypage-store-info">
                    <span className="mypage-store-level">
                      레벨 {store.level}
                    </span>
                    <p className="mypage-store-name">{store.name}</p>
                    <p className="mypage-store-menu">🍽 {store.menu}</p>
                    <p className="mypage-store-loc">
                      {store.distance}m {store.area}
                    </p>
                    <p className="mypage-store-tags">
                      {store.tags.map((t, i) => (
                        <span key={i}># {t} </span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MyPage;
