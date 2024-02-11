import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// context
import AuthContext, { AuthProvider, useAuth } from "./context/AuthContext";

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

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { shouldHideNavbar } from "./utils/navigationUtils";
import MainLayout from "./components/layout/MainLayout";

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
  const { loggedIn } = useAuth();
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/callback", "/game/waiting/:room_id", "/game/play/:game_id"];
  const showNavbar = !shouldHideNavbar(location.pathname, hideNavbarRoutes);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<LoginCallbackPage />} />
        {/* Protect routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<MyProfilePage />} />
            <Route path="/profile/users/:intra_id" element={<UserProfilePage />} />
            <Route path="/users" element={<UserSearchPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/game/list" element={<GameRoomListPage />} />
          </Route>
          <Route path="/game/waiting/:room_id" element={<GameWaitingRoomPage />} />
          <Route path="/game/play/:game_id" element={<GamePlayPage />} />
          {/* fallback page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
