import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// context
import { AuthProvider } from "./context/AuthContext";

// page
import HomePage from "./pages/HomePage";
import GamePlayPage from "./pages/GamePlayPage";
import FriendsPage from "./pages/FriendsPage";
import LoginPage from "./pages/LoginPage";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import MyProfilePage from "./pages/MyProfilePage";
import GameWaitingRoomPage from "./pages/GameWaitingRoomPage";
import GameRoomListPage from "./pages/GameRoomListPage";
import UserSearchPage from "./pages/UserSearchPage";
import NotFoundPage from "./pages/error/NotFoundPage";
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
        <Route path="/profile/users/:intra_id" element={<UserProfilePage />} />
        <Route path="/users" element={<UserSearchPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/game/list" element={<GameRoomListPage />} />
        <Route path="/game/waiting/:room_id" element={<GameWaitingRoomPage />} />
        <Route path="/game/play/:game_id" element={<GamePlayPage />} />
        <Route path="/test" element={<TestPage />} />
        {/* fallback page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
