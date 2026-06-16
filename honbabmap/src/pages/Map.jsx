import { useEffect, useRef, useState } from "react";
import "../styles/Map.css";
import { storeData } from "../data/storeData";
import MapDetail from "../component/MapDetail";
import BottomNav from "../component/BottomNav";
import Marker from "../assets/marker.svg";

const STORE_COORDINATES = {
  1: { lat: 37.49797, lng: 127.0276 },
  2: { lat: 37.49842, lng: 127.02822 },
  3: { lat: 37.49742, lng: 127.02698 },
  4: { lat: 37.49808, lng: 127.02642 },
  5: { lat: 37.49718, lng: 127.02803 },
};

const stores = storeData.flatMap((response) => response.data ?? [response]);

const Map = () => {
  const mapRef = useRef(null);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const container = mapRef.current;

      const center = new window.kakao.maps.LatLng(
        37.49797,
        127.0276
      );

      const map = new window.kakao.maps.Map(container, {
        center,
        level: 3,
      });

      // =========================
      // 마커 세팅
      // =========================
      const normalSize = new window.kakao.maps.Size(30, 30);
      const bigSize = new window.kakao.maps.Size(50, 50);

      const createImage = (size) =>
        new window.kakao.maps.MarkerImage(Marker, size);

      const markers = [];
      const labels = [];

      stores.forEach((store) => {
        const coordinates = STORE_COORDINATES[store.restaurantId] ?? store;

        if (!coordinates.lat || !coordinates.lng) return;

        const position = new window.kakao.maps.LatLng(
          coordinates.lat,
          coordinates.lng
        );

        const marker = new window.kakao.maps.Marker({
          map,
          position,
          image: createImage(normalSize),
        });

        const label = new window.kakao.maps.CustomOverlay({
          position,
          content: `
            <div style="
              font-size:12px;
              font-weight:700;
              color:#000;
              white-space:nowrap;
              padding:2px 4px;
            ">
              ${store.name}
            </div>
          `,
          yAnchor: 0,
        });

        // 기본 숨김
        label.setMap(null);

        markers.push(marker);
        labels.push(label);

        // =========================
        // 클릭만 처리
        // =========================
        window.kakao.maps.event.addListener(marker, "click", () => {
          setSelectedStore(store);

          // 👉 전체 초기화
          markers.forEach((m) => {
            m.setImage(createImage(normalSize));
          });

          labels.forEach((l) => {
            l.setMap(null);
          });

          // 👉 선택된 것만 활성화
          marker.setImage(createImage(bigSize));
          label.setMap(map);
        });
      });
    });
  }, []);

  return (
    <div className="container">
      <header className="header">
        <p>혼밥맵</p>
      </header>
      <div className="search-wrap">
  <input
    type="text"
    className="search-input"
    placeholder="원하는 메뉴를 검색해보세요"
  />
</div>

      <div className="content">
        <div ref={mapRef} className="map" />
        <MapDetail store={selectedStore} />
      </div>

      <BottomNav />
    </div>
  );
};

export default Map;
