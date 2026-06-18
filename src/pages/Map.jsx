import { useEffect, useRef, useState } from "react";
import "../styles/Map.css";
import { storeData } from "../data/storeData";
import MapDetail from "../component/MapDetail";
import BottomNav from "../component/BottomNav";
import Marker from "../assets/marker.svg";
import Arrow2 from "../assets/arrow2.svg";
import { useNavigate } from "react-router-dom";
import NowLevel from "../assets/nowlevel.svg";

const STORE_COORDINATES = {
  1: { lat: 37.58653, lng: 127.02918 },
  2: { lat: 37.58612, lng: 127.02965 },
  3: { lat: 37.58574, lng: 127.02891 },
  4: { lat: 37.58682, lng: 127.02854 },
  5: { lat: 37.58551, lng: 127.02952 },
};

const DEFAULT_CENTER = { lat: 37.586264, lng: 127.029139 };

const stores = storeData.flatMap((response) => response.data ?? [response]);

const Map = () => {
  const mapRef = useRef(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);

  useEffect(() => {
    if (!window.kakao || !mapRef.current) return undefined;

    let isMounted = true;

    window.kakao.maps.load(() => {
      if (!isMounted || !mapRef.current) return;

      const center = new window.kakao.maps.LatLng(
        DEFAULT_CENTER.lat,
        DEFAULT_CENTER.lng
      );

      const map = new window.kakao.maps.Map(mapRef.current, {
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
        zIndex: 0,
      });

      const applyMarkerState = (item) => {
        item.marker.setImage(item.isSelected ? bigImage : normalImage);
        item.marker.setZIndex(item.isSelected ? 30 : 20);
        item.label.setMap(item.isSelected ? map : null);
      };

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
          image: normalImage,
          zIndex: 20,
        });

        const label = new window.kakao.maps.CustomOverlay({
          position,
          content: `
            <div class="map-marker-label">
              ${store.name}
            </div>
          `,
          yAnchor: 0,
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
    });

    return () => {
      isMounted = false;
    };
  }, []);
  const navigate = useNavigate();

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
          placeholder="원하시는 역을 검색해주세요"
          readOnly
          onClick={() => setIsStationModalOpen(true)}
          onFocus={() => setIsStationModalOpen(true)}
        />
      </div>
      <div className="current-level">
        <img src={NowLevel} alt="현재 레벨" />
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
              아직 다른 역의 데이터가 <br /> 준비되지 않았습니다
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
        <MapDetail store={selectedStore} />
      </div>

      <BottomNav />
    </div>
  );
};

export default Map;
