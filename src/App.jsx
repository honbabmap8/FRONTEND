import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import { RegisterProvider } from "./context/RegisterContext";

import BtiResult from "./pages/BtiResult";
import EatBTI from "./pages/EatBTI";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import MyPage from "./pages/MyPage";
import RegisterStep1 from "./pages/RegisterStep1";
import RegisterStep2 from "./pages/RegisterStep2";
import Result from "./pages/Result";
import Review from "./pages/Review";

const appConfig = {
  authToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb28iLCJpYXQiOjE3ODE4Njk0NjIsImV4cCI6MTc4MTg3MzA2Mn0.s6K0hi2R4e2FLWoL-kDeY_J_GBgfyi2c_GSLe0KRFU8",
  defaultRestaurantId: 1,
};

function App() {
  return (
    <BrowserRouter>
      <RegisterProvider>
        <Routes>
          <Route path="/" element={<Map authToken={appConfig.authToken} />} />
          <Route
            path="/map"
            element={<Map authToken={appConfig.authToken} />}
          />
          <Route
            path="/home"
            element={<Home authToken={appConfig.authToken} />}
          />
          <Route
            path="/main"
            element={<Home authToken={appConfig.authToken} />}
          />
          <Route
            path="/result"
            element={<Result authToken={appConfig.authToken} />}
          />
          <Route
            path="/login"
            element={<Login authToken={appConfig.authToken} />}
          />
          <Route
            path="/register"
            element={<RegisterStep1 authToken={appConfig.authToken} />}
          />
          <Route
            path="/register/step2"
            element={<RegisterStep2 authToken={appConfig.authToken} />}
          />
          <Route
            path="/register/eatbti"
            element={<EatBTI authToken={appConfig.authToken} />}
          />
          <Route
            path="/bti/result/:level"
            element={<BtiResult authToken={appConfig.authToken} />}
          />
          <Route
            path="/mypage"
            element={<MyPage authToken={appConfig.authToken} />}
          />
          <Route
            path="/review"
            element={
              <Review
                authToken={appConfig.authToken}
                defaultRestaurantId={appConfig.defaultRestaurantId}
              />
            }
          />
        </Routes>
      </RegisterProvider>
    </BrowserRouter>
  );
}

export default App;
