import Eximg from "../assets/eximg1.jpg";
import "../styles/HomeDetail.css";
import Level1 from "../assets/level1.svg";
import Level2 from "../assets/level2.svg";
import Level3 from "../assets/level3.svg";
import Level4 from "../assets/level4.svg";
import Level5 from "../assets/level5.svg";
import MenuImg from "../assets/menuimg.svg";

const levelImageMap = {
  1: Level1,
  2: Level2,
  3: Level3,
  4: Level4,
  5: Level5,
};

function HomeDetail({ store }) {
  if (!store) return null;

  const location = store.locationInfo;
  const tags = store.restReviewTagList ?? [];
  const soloLevel = Math.min(Math.max(Number(store.restSoloLevel) || 1, 1), 5);
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
        <img
          className="restaurant-level"
          src={levelImageMap[soloLevel]}
          alt={`레벨 ${soloLevel}`}
        />
        <p className="restaurant-name">{store.name}</p>

        <div className="menu-section">
          <img className="menu-image" alt="메뉴 이미지" src={MenuImg} />
          <p className="menu-name">{store.representativeMenu}</p>
        </div>

        <div className="location-section">
          <p className="location-text">{distanceText}</p>
          <p className="location-text">{location?.stationName}</p>        </div>

        <div className="tags-container">
          {tags.slice(0, 3).map((tag) => (
            <p className="tag-item" key={tag.tagId}>
              # {tag.tagName}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeDetail;
