import { useLocation, useNavigate } from "react-router-dom";

import "../styles/BottomNav.css";

import HomeIcon from "../assets/home.png";
import MapIcon from "../assets/map.png";
import WriteIcon from "../assets/write.png";
import MyIcon from "../assets/my.png";

const navItems = [
  {
    id: "home",
    label: "\uD648",
    path: "/home",
    icon: HomeIcon,
    iconClassName: "home-icon",
  },
  {
    id: "map",
    label: "\uC9C0\uB3C4 \uB808\uC774\uB354",
    path: "/map",
    icon: MapIcon,
    iconClassName: "map-icon",
  },
  {
    id: "write",
    label: "\uB9DB\uC9D1 \uC81C\uBCF4",
    path: "/review",
    icon: WriteIcon,
    iconClassName: "write-icon",
  },
  {
    id: "my",
    label: "\uB9C8\uC774\uD398\uC774\uC9C0",
    path: "/mypage",
    icon: MyIcon,
    iconClassName: "my-icon",
  },
];

const pathToActive = {
  "/": "map",
  "/main": "home",
  "/home": "home",
  "/map": "map",
  "/review": "write",
  "/mypage": "my",
};

const BottomNav = ({ activePage }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = activePage || pathToActive[pathname] || "home";

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nav-item ${active === item.id ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <div className="icon-box">
            <img
              src={item.icon}
              alt=""
              className={item.iconClassName}
              aria-hidden="true"
            />
          </div>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
