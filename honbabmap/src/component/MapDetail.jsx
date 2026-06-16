import { Fragment } from "react";
import "../styles/MapDetail.css";
import Menu from "../assets/menuIcon.svg";
import Eximg from "../assets/eximg1.jpg";
import Singlemenu from "../assets/singlemenu.svg";
import Table from "../assets/table.svg";

const featureIconMap = {
  1: Table,
  2: Singlemenu,
};

function MapDetail({ store }) {
  if (!store) return null;

  const restaurant = store.data ? store.data[0] : store;
  const features = restaurant.restFeatureList ?? [];
  const tags = restaurant.restReviewTagList ?? [];
  const location = restaurant.locationInfo;

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
          <p className="level">레벨 {restaurant.restSoloLevel}</p>
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
        {tags.map((tag) => (
          <button key={tag.tagId} type="button">
            {tag.tagName}
          </button>
        ))}
      </div>

      <hr id="hr2" />

      <div className="mapdetailbottom">
        <p className="where">
          📍 {location?.stationName} {location?.distance}m · 도보 {location?.time}분
        </p>
        <p className="lookdetail">자세히 보기 </p>
      </div>
    </div>
  );
}

export default MapDetail;
