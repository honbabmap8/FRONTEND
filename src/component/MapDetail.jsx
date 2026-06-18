import { Fragment } from "react";
import "../styles/MapDetail.css";
import Menu from "../assets/menuimg.svg";
import Eximg from "../assets/eximg1.jpg";
import Singlemenu from "../assets/singlemenu.svg";
import Table from "../assets/table.svg";
import locationIcon from "../assets/locationicon.svg";

const featureIconMap = {
  1: Table,
  2: Singlemenu,
};

const getTagIcon = (tagName = "") => {
  if (tagName.includes("가성비")) return "/image/cheap.svg";
  if (tagName.includes("빠른") || tagName.includes("회전")) return "/image/fast.svg";
  if (
    tagName.includes("야식") ||
    tagName.includes("늦") ||
    tagName.includes("24시간")
  ) {
    return "/image/night.svg";
  }
  if (tagName.includes("웨이팅") || tagName.includes("대기")) {
    return "/image/waiting.svg";
  }

  return null;
};

function MapDetail({ store }) {
  if (!store) return null;

  const restaurant = store.data ? store.data[0] : store;
  const features = restaurant.restFeatureList ?? [];
  const tags = restaurant.restReviewTagList ?? [];
  const location = restaurant.locationInfo;
  const soloLevel = Math.min(Math.max(Number(restaurant.restSoloLevel) || 1, 1), 5);

  return (
    <div className="mapdetail">
      <hr id="hr1" />

      <div className="mapdetailtop">
        <img
          className="storeimg"
          src={restaurant.imageUrl || Eximg}
          alt={restaurant.name}
          onError={(event) => {
            event.currentTarget.src = Eximg;
          }}
        />

        <div id="detailcontainer">
          <img
            className="level"
            src={`/image/level_${soloLevel}.svg`}
            alt={`레벨 ${soloLevel}`}
          />
          <h3 className="name">{restaurant.name}</h3>

          <div className="menulist">
            <img className="menuiconimage" alt="메뉴 이미지" src={Menu} />
            <p className="menudetail">{restaurant.representativeMenu}</p>
          </div>

          <p className="desc">{restaurant.restaurantDetail}</p>

          <div className="feature-list">
            {features.map((feature, index) => {
              const icon = featureIconMap[feature.featId];

              return (
                <Fragment key={feature.featId}>
                  <div className="feature1">
                    {icon && (
                      <img
                        className="feature-icon"
                        src={icon}
                        alt=""
                        aria-hidden="true"
                      />
                    )}
                    <p>{feature.featName}</p>
                  </div>
                  {index < features.length - 1 && (
                    <span className="feature-break" aria-hidden="true" />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mapdetailbtns">
        {tags.map((tag) => {
          const tagIcon = getTagIcon(tag.tagName);

          return (
            <button
              key={tag.tagId}
              type="button"
              className={`tag-btn ${tagIcon ? "tag-btn--icon" : ""}`}
              aria-label={tag.tagName}
            >
              {tagIcon ? (
                <img className="tag-icon" src={tagIcon} alt="" aria-hidden="true" />
              ) : (
                tag.tagName
              )}
            </button>
          );
        })}
      </div>

      <hr id="hr2" />

      <div className="mapdetailbottom">
        <div className="location-info">
        <img src={locationIcon} alt="위치 아이콘" className="location-icon" />
        <p className="where">
           {location?.stationName} {location?.distance}m · 도보 {location?.time}분
        </p>
        </div>
        
        <p className="lookdetail">자세히 보기 </p>
      </div>
    </div>
  );
}

export default MapDetail;
