import BottomNav from "../component/BottomNav";
import HomeImg from "../assets/hometopimg.png";
import Click from "../assets/click.svg";
import HomeDetail from "../component/HomeDetail";
import { storeData } from "../data/storeData";
import "../styles/Home.css";

const stores = storeData.flatMap((response) => response.data ?? [response]);

function Home() {
  return (
    <div className="container">
      <div className="top">
        <div id="topbackground">
          <img id="homeimg" src={HomeImg} alt="" />
          <div id="topbottomimg"></div>
        </div>

        <div id="topcontents">
          <select id="selectstop" defaultValue="sungshin">
            <option value="sungshin">성신여대입구</option>
            <option value="hansung">한성대입구</option>
            <option value="bomun">보문</option>
            <option value="donam">돈암동</option>
          </select>

          <div>
            <p id="contentslevel">레벨1</p>
            <p id="contentsp">안녕하세요 님<br />혼밥 식당 추천해드려요</p>
          </div>

          <button>
            <img id="clickimg" src={Click} alt="" />
            <p id="clickp">오늘 혼밥 뭐 먹을까요?</p>
          </button>
        </div>
      </div>

      <div className="middlebtn">
        <button id="levelbtn">레벨 1</button>
        <button id="longbtn">거리순</button>
      </div>

      <div className="contentlist">
        {stores.map((store) => (
          <HomeDetail key={store.restaurantId} store={store} />
        ))}
      </div>
      <BottomNav />
    </div>
  );
}

export default Home;
