import { useEffect, useRef, useState } from "react";
import "../styles/Map.css";
import MapDetail from "../component/MapDetail";
import BottomNav from "../component/BottomNav";
import Marker from "../assets/marker.svg";
import Arrow2 from "../assets/arrow2.svg";
import { useNavigate } from "react-router-dom";

const COORDINATE_STORAGE_KEY = "honbab-map-coordinates";

const STORE_COORDINATES = {
  1: { lat: 37.53372, lng: 126.97218 },
  2: { lat: 37.53358, lng: 126.97278 },
  3: { lat: 37.53336, lng: 126.97325 },
  4: { lat: 37.53318, lng: 126.97386 },
  5: { lat: 37.53292, lng: 126.97172 },
  6: { lat: 37.53278, lng: 126.97236 },
  7: { lat: 37.53254, lng: 126.97302 },
  8: { lat: 37.53235, lng: 126.97362 },
  9: { lat: 37.53212, lng: 126.97412 },
  10: { lat: 37.53184, lng: 126.97202 },
  11: { lat: 37.53172, lng: 126.97268 },
  12: { lat: 37.53155, lng: 126.97328 },
  13: { lat: 37.53138, lng: 126.97386 },
  14: { lat: 37.53392, lng: 126.97156 },
  15: { lat: 37.53218, lng: 126.97142 }
};

const DEFAULT_CENTER = { lat: 37.53458, lng: 126.97302 };
const RESTAURANT_IDS = Array.from({ length: 15 }, (_, index) => index + 1);

const getInitialCoordinates = () => {
  if (typeof window === "undefined") {
    return STORE_COORDINATES;
  }

  try {
    const savedCoordinates = JSON.parse(
      window.localStorage.getItem(COORDINATE_STORAGE_KEY)
    );

    if (!savedCoordinates || typeof savedCoordinates !== "object") {
      return STORE_COORDINATES;
    }

    return { ...STORE_COORDINATES, ...savedCoordinates };
  } catch {
    return STORE_COORDINATES;
  }
};

const Map = ({ authToken }) => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeCoordinates, setStoreCoordinates] = useState(getInitialCoordinates);
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);
  const [mapMessage, setMapMessage] = useState("식당 정보를 불러오는 중...");

  const updateCoordinate = (restaurantId, nextCoordinate) => {
    setStoreCoordinates((currentCoordinates) => {
      const nextCoordinates = {
        ...currentCoordinates,
        [restaurantId]: nextCoordinate,
      };

      window.localStorage.setItem(
        COORDINATE_STORAGE_KEY,
        JSON.stringify(nextCoordinates)
      );

      return nextCoordinates;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchRestaurants = async () => {
      setMapMessage("식당 정보를 불러오는 중...");

      try {
        const responses = await Promise.all(
          RESTAURANT_IDS.map(async (restaurantId) => {
            const response = await fetch(`/api/restaurants/${restaurantId}`, {
              method: "GET",
              headers: {
                accept: "*/*",
                Authorization: `Bearer ${authToken}`,
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
            return result.data;
          }),
        );

        if (!isMounted) return;

        const nextStores = responses.filter(Boolean);
        setStores(nextStores);
        setSelectedStore(null);
        setMapMessage(
          nextStores.length > 0 ? "" : "표시할 식당 정보가 없습니다."
        );
      } catch (error) {
        if (!isMounted) return;

        console.error("[Map] restaurants fetch error:", error);
        setMapMessage("식당 정보를 불러오지 못했습니다.");
      }
    };

    fetchRestaurants();

    return () => {
      isMounted = false;
    };
  }, [authToken]);

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
        zIndex: 0,
      });

      const applyMarkerState = (item) => {
        item.marker.setImage(item.isSelected ? bigImage : normalImage);
        item.marker.setZIndex(item.isSelected ? 30 : 20);
        item.label.setMap(item.isSelected ? map : null);
      };

      stores.forEach((store) => {
        const coordinates = storeCoordinates[store.restaurantId] ?? store;
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
          draggable: true,
        });

        const label = new window.kakao.maps.CustomOverlay({
          position,
          content: `
            <div class="map-marker-label">
              ${restaurantName}
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

        window.kakao.maps.event.addListener(marker, "dragend", () => {
          const nextPosition = marker.getPosition();

          setSelectedStore(store);
          updateCoordinate(store.restaurantId, {
            lat: Number(nextPosition.getLat().toFixed(6)),
            lng: Number(nextPosition.getLng().toFixed(6)),
          });
        });
      });
    });

    return () => {
      isMounted = false;
      mapContainer.innerHTML = "";
    };
  }, [stores, storeCoordinates]);
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
        <img src="/image/level_44.svg" alt="현재 레벨" />
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

        {mapMessage && <p className="map-message">{mapMessage}</p>}
        <MapDetail store={selectedStore} />
      </div>

      <BottomNav />
    </div>
  );
};

export default Map;
