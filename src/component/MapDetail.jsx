import "../styles/MapDetail.css";

function MapDetail({ store }) {
  if (!store) return null;

  return (
    <div className="mapdetail">
      <hr id="hr1" />

      <div className="mapdetailtop">
        <img src={store.img} alt="store" />

        <div id="detailcontainer">
          <p className="level">{store.level}</p>
          <h3 className="name">{store.name}</h3>
          <p>{store.keyword}</p>
          <p className="desc">{store.detail}</p>
          <p className="feature1">{store.feature1}</p>
          <p className="feature2">{store.feature2}</p>
        </div>
      </div>

     
      <div className="mapdetailbtns">
      
        <button>
        {store.toggle?.cheap ? "가성비" : "고급"}
        </button>

        <button>
          {store.toggle?.fast ? "빠른 식사" : "여유로운 식사"}
        </button>

        <button>
          {store.toggle?.lowWait ? "웨이팅 적음" : "웨이팅 있음"}
        </button>

        <button>
          {store.toggle?.lateNight ? "야식 가능" : "일반 식사"}
        </button>
      </div>

      <hr id="hr2" />

      <div className="mapdetailbottom">
        <p>📍 {store.where}</p>
        <p>자세히 보기</p>
      </div>
    </div>
  );
}

export default MapDetail;