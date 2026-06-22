import BottomNav from "../component/BottomNav";
import HomeImg from "../assets/hometopimg.png";
import Click from "../assets/click.svg";
import HomeDetail from "../component/HomeDetail";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe, getStoredUser } from "../api/user";
import "../styles/Home.css";

const RESTAURANT_IDS = Array.from({ length: 15 }, (_, index) => index + 1);
const API_URL = import.meta.env.VITE_API_URL;

const getSoloLevel = (store) => Number(store.restSoloLevel) || 1;

function Home({ authToken }) {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("level");
  const [userInfo, setUserInfo] = useState(getStoredUser);

  const displayedStores = useMemo(() => {
    if (activeFilter !== "distance") {
      return stores;
    }

    return [...stores].sort((a, b) => {
      const aDistance = Number(a.locationInfo?.distance ?? Infinity);
      const bDistance = Number(b.locationInfo?.distance ?? Infinity);

      return aDistance - bDistance;
    });
  }, [activeFilter, stores]);

  const handleStoreClick = (store) => {
    navigate("/map", {
      state: {
        selectedRestaurantId: store.restaurantId,
      },
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const user = await fetchMe(authToken);
        const nextUserInfo = {
          nickname: user.nickname || "",
          honbabLevel: Number(user.honbabLevel) || 1,
        };

        if (isMounted) {
          setUserInfo(nextUserInfo);
        }

        return nextUserInfo;
      } catch (error) {
        console.error("[Home] user fetch error:", error);
        return getStoredUser();
      }
    };

    const fetchRestaurants = async (honbabLevel) => {
      setIsLoading(true);
      setErrorMessage("");
      const token = authToken || localStorage.getItem("token");

      try {
        const responses = await Promise.all(
          RESTAURANT_IDS.map(async (restaurantId) => {
            const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
              method: "GET",
              headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              console.error(
                `[Home] restaurant ${restaurantId} fetch failed:`,
                response.status,
                await response.text(),
              );
              return null;
            }

            const result = await response.json();
            return result.data;
          }),
        );

        if (!isMounted) return;

        setStores(
          responses
            .filter(Boolean)
            .filter((store) => getSoloLevel(store) <= honbabLevel)
            .sort((a, b) => getSoloLevel(a) - getSoloLevel(b)),
        );
      } catch (error) {
        if (!isMounted) return;

        console.error("[Home] restaurants fetch error:", error);
        setErrorMessage("식당 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const fetchHomeData = async () => {
      const nextUserInfo = await fetchUser();
      if (!isMounted) return;

      fetchRestaurants(nextUserInfo.honbabLevel);
    };

    fetchHomeData();

    return () => {
      isMounted = false;
    };
  }, [authToken]);

  return (
    <div className="container">
      <div className="top">
        <div id="topbackground">
          <img id="homeimg" src={HomeImg} alt="" />
          <div id="topbottomimg"></div>
        </div>

        <div id="topcontents">
          <select id="selectstop" defaultValue="samgakji">
            <option value="samgakji">삼각지역</option>
            <option value="sookmyung">숙대입구역</option>
            <option value="namyeong">남영역</option>
            <option value="yongsan">용산역</option>
          </select>

          <div>
            <p id="contentslevel">레벨{userInfo.honbabLevel}</p>
            <p id="contentsp">안녕하세요 <strong>{userInfo.nickname}</strong> 님<br />혼밥 식당 추천해드려요</p>
          </div>

           <button onClick={() => navigate("/map")}>
      <img id="clickimg" src={Click} alt="" />
      <p id="clickp">오늘 혼밥 어때요?</p>
    </button>
        </div>
      </div>

      <div className="middlebtn">
        <button
          id="levelbtn"
          className={activeFilter === "level" ? "active" : ""}
          type="button"
          onClick={() => setActiveFilter("level")}
        >
          레벨 {userInfo.honbabLevel}
        </button>
        <button
          id="longbtn"
          className={activeFilter === "distance" ? "active" : ""}
          type="button"
          onClick={() => setActiveFilter("distance")}
        >
          거리순
        </button>
      </div>

      <div className="contentlist">
        {isLoading && <p className="home-list-message">데이터를 불러오는 중입니다...</p>}
        {!isLoading && errorMessage && (
          <p className="home-list-message">{errorMessage}</p>
        )}
        {!isLoading &&
          !errorMessage &&
          displayedStores.map((store) => (
            <HomeDetail
              key={store.restaurantId}
              store={store}
              onClick={() => handleStoreClick(store)}
            />
          ))}
      </div>
      <BottomNav />
    </div>
  );
}

export default Home;


