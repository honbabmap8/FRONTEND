import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import LoadingResult from "./pages/LoadingResult";

function App() {
  return (
    <BrowserRouter>
      <RegisterProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 지도 및 메인 플로우 */}
          <Route path="/map" element={<Map />} />
          <Route path="/home" element={<Home />} />
          <Route path="/main" element={<Home />} />
          <Route path="/result" element={<Result />} />

          {/* 인증 및 인증 후 플로우 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterStep1 />} />
          <Route path="/register/step2" element={<RegisterStep2 />} />

          {/* EatBTI 검사 및 결과 */}
          <Route path="/register/eatbti" element={<EatBTI />} />
          <Route path="/bti/loading" element={<LoadingResult />} />
          <Route path="/bti/result/:level" element={<BtiResult />} />

          {/* 마이페이지 및 리뷰 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/review" element={<Review defaultRestaurantId={1} />} />
        </Routes>
      </RegisterProvider>
    </BrowserRouter>
  );
}

export default App;
