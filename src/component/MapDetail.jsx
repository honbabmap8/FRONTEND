import { Fragment } from "react";
import "../styles/MapDetail.css";
import Menu from "../assets/menuimg.svg";
import Eximg from "../assets/eximg1.jpg";
import locationIcon from "../assets/locationicon.svg";

const FEATURE_ICON_MAP = {
  "혼밥 난이도": "good_satisfy",
  "혼밥 분위기": "quiet_mood",
  "빠른 회전율": "fast_fastcircle",
  "회전율": "fast_food",
  "시선 부담": "noonesee_alonegood",
  "1인석 있음": "alone_healing",
  "타겟층 추천": "taget_recomm",
  "재방문율": "re_come",
};

const getTagIcon = (tagName = "") => {
  if (tagName.includes("가성비") || tagName.includes("1인 메뉴") || tagName.includes("양이 적당")) return "/image/cheap.svg";

  if (tagName.includes("포장")) {
    return "/image/fast.svg";
  }

  if (
    tagName.includes("야식") ||
    tagName.includes("늦") ||
    tagName.includes("24시간")
  ) {
    return "/image/night.svg";
  }

  if (tagName.includes("웨이팅") || tagName.includes("회전")) {
    return "/image/waiting.svg";
  }
  else

  return "/image/best-honbab.svg";
};

function MapDetail({ store }) {
  if (!store) return null;

  const restaurant = store.data ? store.data[0] : store;

  const features = restaurant.restFeatureList ?? [];
  const tags = restaurant.restReviewTagList ?? [];
  const location = restaurant.locationInfo;

  const restaurantName =
    restaurant.restaurantName ?? restaurant.name;

  const soloLevel = Math.min(
    Math.max(Number(restaurant.restSoloLevel) || 1, 1),
    5
  );

  return (
    <div className="mapdetail">
      <hr id="hr1" />

      <div className="mapdetailtop">
        <img
          className="storeimg"
          src={restaurant.imageUrl || Eximg}
          alt={restaurantName}
          onError={(event) => {
            event.currentTarget.src = Eximg;
          }}
        />

        <div id="detailcontainer">
          <img
            className="level"
            src={`/image/level_${soloLevel}${soloLevel}.svg`}
            alt={`레벨 ${soloLevel}`}
          />

          <h3 className="name">{restaurantName}</h3>

          <div className="menulist">
            <img
              className="menuiconimage"
              alt="메뉴 이미지"
              src={Menu}
            />
            <p className="menudetail">
              {restaurant.representativeMenu}
            </p>
          </div>

          <p className="desc">
            {restaurant.restaurantDetail}
          </p>

          <div className="feature-list">
            {features.map((feature, index) => {
              const iconName =
                FEATURE_ICON_MAP[feature.featName] ||
                "hand_finger_regular";

              return (
                <Fragment key={feature.featId}>
                  <div className="feature1">
                    <img
                      className="feature-icon"
                      src={`/image/${iconName}.svg`}
                      alt={feature.featName}
                    />

                    <div className="feature-text">
                      <p className="feature-name">
                        {feature.featName}
                      </p>

                      <p className="feature-detail">
                        {feature.featDetail}
                      </p>
                    </div>
                  </div>

                  {index < features.length - 1 && (
                    <span
                      className="feature-break"
                      aria-hidden="true"
                    />
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
              className={`tag-btn ${
                tagIcon ? "tag-btn--icon" : ""
              }`}
              aria-label={tag.tagName}
            >
              {tagIcon ? (
                <img
                  className="tag-icon"
                  src={tagIcon}
                  alt=""
                  aria-hidden="true"
                />
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
          <img
            src={locationIcon}
            alt="위치 아이콘"
            className="location-icon"
          />

          <p className="where">
            {location?.stationName} {location?.distance}m · 도보{" "}
            {location?.time}분
          </p>
        </div>

        <p className="lookdetail">자세히 보기</p>
      </div>
    </div>
  );
}

export default MapDetail;