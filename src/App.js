import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

import AuthContext, { AuthProvider } from "./AuthContext";

// pages
import HomePage from "./pages/HomePage";
import GamePlayPage from "./pages/game/GamePlayPage";
import FriendsPage from "./pages/FriendsPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import MyProfilePage from "./pages/MyProfilePage";
import RoomListPage from "./pages/RoomListPage";
import ChatPage from "./pages/ChatPage";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import RoomPage from "./pages/game/RoomPage";

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
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/profile/users/:user_id" element={<UserProfilePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/games" element={<RoomListPage />} />
        <Route path="/play/:game_id" element={<GamePlayPage />} />
        <Route path="/games/onevsone/:room_id" element={<RoomPage />} />
        <Route path="/games/tournament/:room_id" element={<RoomPage />} />
        {/* fallback page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
