import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import AuthContext, { AuthProvider } from "./AuthContext";

// pages
import HomePage from "./pages/HomePage";
import GamePlayPage from "./pages/game/GamePlayPage";
import FriendsPage from "./pages/FriendsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RoomListPage from "./pages/RoomListPage";
import ChatPage from "./pages/ChatPage";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import RoomPage from "./pages/game/RoomPage";

// 보호된 경로를 위한 라우트 컴포넌트
const ProtRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);
  // todo: 토큰 유효성 검사 로직 구현
  const isValidToken = (token) => {
    return token === "dev-token";
  };

  return isValidToken(authToken) ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { setAuthToken } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProtRoute><HomePage /></ProtRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProtRoute><ProfilePage /></ProtRoute>} />
          <Route path="/profile/users/:user_id" element={<ProtRoute><ProfilePage /></ProtRoute>} />
          <Route path="/users" element={<ProtRoute><UsersPage /></ProtRoute>} />
          <Route path="/friends" element={<ProtRoute><FriendsPage /></ProtRoute>} />
          <Route path="/chat" element={<ProtRoute><ChatPage /></ProtRoute>} />
          <Route path="/games" element={<ProtRoute><RoomListPage /></ProtRoute>} />
          <Route path="/play/:game_id" element={<ProtRoute><GamePlayPage /></ProtRoute>} />
          <Route path="/games/onevsone/:room_id" element={<ProtRoute><RoomPage /></ProtRoute>} />
          <Route path="/games/tournament/:room_id" element={<ProtRoute><RoomPage /></ProtRoute>} />
          {/* fallback page */}
          <Route path="*" element={<ProtRoute><NotFoundPage /></ProtRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
