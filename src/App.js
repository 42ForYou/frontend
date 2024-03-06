import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// context
import { AuthProvider } from "./context/AuthContext";
import { SocketProviderWrapper } from "./context/SocketContext";
import { GameProviderWrapper } from "./context/GameContext";
import { OnlineStatusProviderWrapper } from "./context/OnlineStatusContext";

// page
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import OAuthLoginPage from "./pages/auth/OAuthLoginPage";
import OAuthCallbackPage from "./pages/auth/OAuthCallbackPage";
import TwoFactorAuthPage from "./pages/auth/TwoFactorAuthPage";
import ChatPage from "./pages/menu/ChatPage";
import RoomListPage from "./pages/menu/RoomListPage";
import GameWaitingRoomPage from "./pages/game/GameWaitingRoomPage";
import GamePlayPage from "./pages/game/GamePlayPage";
import NotFoundPage from "./pages/NotFoundPage";
import FriendsPage from "./pages/menu/FriendsPage";
import UserSearchPage from "./pages/menu/UserSearchPage";
import MyProfilePage from "./pages/profile/MyProfilePage";
import UserProfilePage from "./pages/profile/UserProfilePage";

// layout
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PongScenePage from "./pages/game/PongScenePage";

// todo: Tournament, OnlineStatus는 필요한 컴포넌트에만 공급 검토
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

// todo: 콜백 페이지 경로 변경
const AppContent = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<OAuthLoginPage />} />
        <Route path="/login/2fa" element={<TwoFactorAuthPage />} />
        <Route path="/login/callback" element={<OAuthCallbackPage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Protect routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SocketProviderWrapper />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<MyProfilePage />} />
              <Route path="/profile/users/:intra_id" element={<UserProfilePage />} />
              <Route path="/users" element={<UserSearchPage />} />
              <Route element={<OnlineStatusProviderWrapper />}>
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/game/list" element={<RoomListPage />} />
              </Route>
            </Route>
            <Route element={<GameProviderWrapper />}>
              <Route path="/game/waiting/:room_id" element={<GameWaitingRoomPage />} />
              <Route path="/game/play/:game_id" element={<GamePlayPage />} />
            </Route>
            {/* fallback page */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
