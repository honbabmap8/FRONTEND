import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/BottomNav.css";

import Home from "../assets/home.png";
import Map from "../assets/map.png";
import Write from "../assets/write.png";
import My from "../assets/my.png";

const BottomNav = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("map");

  const go = (page) => {
    setActive(page);

    if (page === "home") navigate("/main");
    if (page === "map") navigate("/");
    if (page === "write") navigate("/questionlist");
    if (page === "my") navigate("/mypage");
  };

  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${active === "home" ? "active" : ""}`}
        onClick={() => go("home")}
      >
        <div className="icon-box">
          <img src={Home} alt="home" className="home-icon" />
        </div>
        <span>홈</span>
      </div>

      <div
        className={`nav-item ${active === "map" ? "active" : ""}`}
        onClick={() => go("map")}
      >
        <div className="icon-box">
          <img src={Map} alt="map" className="map-icon" />
        </div>
        <span>지도 레이더</span>
      </div>

      <div
        className={`nav-item ${active === "write" ? "active" : ""}`}
        onClick={() => go("write")}
      >
        <div className="icon-box">
          <img src={Write} alt="write" className="write-icon" />
        </div>
        <span>맛집 제보</span>
      </div>

      <div
        className={`nav-item ${active === "my" ? "active" : ""}`}
        onClick={() => go("my")}
      >
        <div className="icon-box">
          <img src={My} alt="my" className="my-icon" />
        </div>
        <span>마이페이지</span>
      </div>
    </nav>
  );
};

export default BottomNav;