import { useEffect, useRef, useState } from "react";
import "../styles/Map.css";
import { storeData } from "../data/storeData";
import MapDetail from "../component/MapDetail";
import BottomNav from "../component/BottomNav";
import Marker from "../assets/marker.svg";

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

      const normalImage = new window.kakao.maps.MarkerImage(
        Marker,
        new window.kakao.maps.Size(30, 30)
      );
      const bigImage = new window.kakao.maps.MarkerImage(
        Marker,
        new window.kakao.maps.Size(50, 50)
      );
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
