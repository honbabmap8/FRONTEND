import { useEffect, useRef, useState } from "react";
import "../styles/Map.css";
import MapDetail from "../component/MapDetail";
import BottomNav from "../component/BottomNav";
import Marker from "../assets/marker.svg";
import Arrow2 from "../assets/arrow2.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMe, getStoredUser } from "../api/user";

const API_URL = import.meta.env.VITE_API_URL;


const DEFAULT_CENTER = { lat: 37.53458, lng: 126.97302 };
const RESTAURANT_IDS = Array.from({ length: 15 }, (_, index) => index + 1);


const Map = ({ authToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef(null);
  const selectedRestaurantId = location.state?.selectedRestaurantId;
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);
  const [mapMessage, setMapMessage] = useState("지도를 로딩 중입니다...");
  const [userInfo, setUserInfo] = useState(getStoredUser);

  

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const user = await fetchMe(authToken);
        if (isMounted) {
          setUserInfo({
            nickname: user.nickname || "",
            honbabLevel: Number(user.honbabLevel) || 1,
          });
        }
      } catch (error) {
        console.error("[Map] user fetch error:", error);
      }
    };

    const fetchRestaurants = async () => {
      setMapMessage("지도를 로딩 중입니다...");
      
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
    `[Map] restaurant ${restaurantId} fetch failed:`,
    response.status,
    await response.text(),
  );
  return null;
}

const result = await response.json();

console.log(
  `[Map] restaurant ${restaurantId}`,
  result.data
);

return result.data;
          }),
        );

        if (!isMounted) return;

        const nextStores = responses.filter(Boolean);
        const initialSelectedStore = nextStores.find(
          (store) => store.restaurantId === selectedRestaurantId
        );

        setStores(nextStores);
        setSelectedStore(initialSelectedStore ?? null);
        setMapMessage(
          nextStores.length > 0 ? "" : "검색된 음식점이 없습니다."
        );
      } catch (error) {
        if (!isMounted) return;

        console.error("[Map] restaurants fetch error:", error);
        setMapMessage("음식점 정보를 불러오는데 실패했습니다.");
      }
    };

    fetchUser();
    fetchRestaurants();

    return () => {
      isMounted = false;
    };
  }, [authToken, selectedRestaurantId]);

  useEffect(() => {
    if (!window.kakao || !mapRef.current || stores.length === 0) {
      return undefined;
    }

    let isMounted = true;
    const mapContainer = mapRef.current;

    window.kakao.maps.load(() => {
      if (!isMounted || !mapContainer) return;

      const center = new window.kakao.maps.LatLng(
        DEFAULT_CENTER.lat,
        DEFAULT_CENTER.lng
      );

      const map = new window.kakao.maps.Map(mapContainer, {
        center,
        level: 3,
      });

      const createMarkerImage = (size) =>
        new window.kakao.maps.MarkerImage(
          Marker,
          new window.kakao.maps.Size(size, size),
          {
            offset: new window.kakao.maps.Point(size / 2, size),
          }
        );

      const normalImage = createMarkerImage(30);
      const bigImage = createMarkerImage(50);
      const markerItems = [];

      const radarOverlay = new window.kakao.maps.CustomOverlay({
  position: center,
  content: `
    <div class="marker-radar-wrap" aria-hidden="true">
      <div class="marker-radar">
        <div class="radar-rings"></div>
        <div class="radar-sweep"></div>
      </div>
    </div>
  `,
  xAnchor: 0.5,
  yAnchor: 0.5,
  clickable: false,
  zIndex: 1,
});

      const applyMarkerState = (item) => {
  item.marker.setImage(item.isSelected ? bigImage : normalImage);
  item.marker.setZIndex(item.isSelected ? 30 : 20);

  item.label.setZIndex(999);

  item.label.setMap(item.isSelected ? map : null);
      };
      const availableStores = stores.filter(
  (store) =>
    Number(store.restSoloLevel || 1) <=
    Number(userInfo.honbabLevel || 1)
);

     availableStores.forEach((store) => {
  console.log(
    "[MAP]",
    store.restaurantId,
    store.locationInfo?.restLat,
    store.locationInfo?.restLng
  );

  const coordinates = {
    lat: store.locationInfo?.restLat,
    lng: store.locationInfo?.restLng,
  };

  const restaurantName = store.restaurantName ?? store.name;

  if (!coordinates.lat || !coordinates.lng) return;

  const position = new window.kakao.maps.LatLng(
    coordinates.lat,
    coordinates.lng
  );

        const marker = new window.kakao.maps.Marker({
  map,
  position,
  image: normalImage,
  zIndex: 20,
});

        const label = new window.kakao.maps.CustomOverlay({
          position,
           content: `
           <div class="map-marker-label">
              ${restaurantName}
           </div>
  `,
  yAnchor: 0,
  zIndex: 999,
});

        label.setMap(null);

        const markerItem = {
          marker,
          label,
          store,
          position,
          coordinates,
          isSelected: false,
        };

        markerItems.push(markerItem);

        window.kakao.maps.event.addListener(marker, "click", () => {
          setSelectedStore(store);

          markerItems.forEach((item) => {
            item.isSelected = false;
            applyMarkerState(item);
          });

          markerItem.isSelected = true;
          applyMarkerState(markerItem);

          radarOverlay.setPosition(markerItem.position);
          radarOverlay.setMap(map);
        });

      });

      const initialMarkerItem = markerItems.find(
        (item) => item.store.restaurantId === selectedRestaurantId
      );

      if (initialMarkerItem) {
        initialMarkerItem.isSelected = true;
        applyMarkerState(initialMarkerItem);
        radarOverlay.setPosition(initialMarkerItem.position);
        radarOverlay.setMap(map);
        map.setCenter(initialMarkerItem.position);
      }
    });

    return () => {
      isMounted = false;
      mapContainer.innerHTML = "";
    };
  }, [stores, selectedRestaurantId]);
  return (
    <div className="container">
      <header className="header">
        <img src={Arrow2} alt="뒤로 가기" className="back-button" onClick={() => navigate("/Home")} />
        <p className="header-title">탐색 결과</p>
      </header>

      <div className="search-wrap">
        <input
          type="text"
          className="search-input"
          placeholder="원하는 역을 검색해주세요"
          readOnly
          onClick={() => setIsStationModalOpen(true)}
          onFocus={() => setIsStationModalOpen(true)}
        />
      </div>
      <div className="current-level">
        <img src={`/image/level_${userInfo.honbabLevel}${userInfo.honbabLevel}.svg`} alt="현재 레벨" />
      </div>

      {isStationModalOpen && (
        <div
          className="station-modal-backdrop"
          role="presentation"
          onClick={() => setIsStationModalOpen(false)}
        >
          <div
            className="station-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="station-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p id="station-modal-title" className="station-modal-title">
              아직 다른 역 데이터를 <br /> 준비 중입니다
            </p>
            <button
              type="button"
              className="station-modal-button"
              onClick={() => setIsStationModalOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}

      <div className="content">
        <div ref={mapRef} className="map" />

        {mapMessage && <p className="map-message">{mapMessage}</p>}
        <MapDetail store={selectedStore} />
      </div>

      <BottomNav />
    </div>
  );
};

export default Map;


