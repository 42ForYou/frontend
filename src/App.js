import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// context
import { AuthProvider } from "./context/AuthContext";
import { SocketProviderWrapper } from "./context/SocketContext";
import { GameProviderWrapper } from "./context/GameContext";
import { OnlineStatusProviderWrapper } from "./context/OnlineStatusContext";

// page
import HomePage from "./pages/HomePage";
import GamePlayPage from "./pages/GamePlayPage";
import FriendsPage from "./pages/FriendsPage";
import OauthCallbackPage from "./pages/auth/OauthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import MyProfilePage from "./pages/MyProfilePage";
import GameWaitingRoomPage from "./pages/GameWaitingRoomPage";
import GameRoomListPage from "./pages/GameRoomListPage";
import UserSearchPage from "./pages/UserSearchPage";
import NotFoundPage from "./pages/error/NotFoundPage";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import ChatPage from "./pages/ChatPage";
import TwoFactorAuthPage from "./pages/auth/TwoFactorAuthPage";
import OAuthLoginPage from "./pages/auth/OauthLoginPage";

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
        <Route path="/login" element={<OAuthLoginPage />} />
        <Route path="/login/2fa" element={<TwoFactorAuthPage />} />
        <Route path="/login/callback" element={<OauthCallbackPage />} />
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
              </Route>
            </Route>
            <Route element={<GameProviderWrapper />}>
              <Route element={<MainLayout />}>
                <Route path="/game/list" element={<GameRoomListPage />} />
              </Route>
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
