import Eximg from "../assets/eximg1.jpg";
import "../styles/HomeDetail.css";
import Menu from "../assets/menuIcon.svg";

function HomeDetail({ store }) {
  if (!store) return null;

  const location = store.locationInfo;
  const tags = store.restReviewTagList ?? [];
  const distanceText =
    location?.distance >= 1000
      ? `${(location.distance / 1000).toFixed(1)}KM`
      : `${location?.distance ?? 0}m`;

  return (
    <div className="home-detail-container">
      <img
        src={store.imageUrl || Eximg}
        alt={store.name}
        className="home-detail-main-image"
        onError={(event) => {
          event.currentTarget.src = Eximg;
        }}
      />

      <div className="home-detail-content">
        <p className="restaurant-level">레벨 {store.restSoloLevel}</p>
        <p className="restaurant-name">{store.name}</p>

        <div className="menu-section">
          <img className="menu-image" alt="메뉴 이미지" src={Menu} />
          <p className="menu-name">{store.representativeMenu}</p>
        </div>

        <div className="location-section">
          <p className="location-text">{distanceText}</p>
          <p className="location-text">{location?.stationName}</p>
          <p className="location-text">도보 {location?.time}분</p>
        </div>

        <div className="tags-container">
          {tags.slice(0, 3).map((tag) => (
            <p className="tag-item" key={tag.tagId}>
              #{tag.tagName}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeDetail;
