import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// context
import { AuthProvider } from "./context/AuthContext";

// page
import HomePage from "./pages/HomePage";
import GamePlayPage from "./pages/game/GamePlayPage";
import FriendsPage from "./pages/FriendsPage";
import LoginPage from "./pages/LoginPage";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import MyProfilePage from "./pages/MyProfilePage";
import RoomListPage from "./pages/RoomListPage";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import RoomPage from "./pages/game/RoomPage";
import TestPage from "./pages/TestPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

const AppContent = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* 로그인 콜백 페이지를 라우팅 관련 이슈 없이 /login 경로 아래 둘 수 있는 방법 알아보기 */}
        <Route path="/callback" element={<LoginCallbackPage />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/profile/users/:user_id" element={<UserProfilePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/games" element={<RoomListPage />} />
        <Route path="/play/:game_id" element={<GamePlayPage />} />
        <Route path="/games/onevsone/:room_id" element={<RoomPage />} />
        <Route path="/games/tournament/:room_id" element={<RoomPage />} />
        <Route path="/test" element={<TestPage />} />
        {/* fallback page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
