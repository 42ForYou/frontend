import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

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

export const GlobalContext = createContext(); // 정보가 많아질시 차후 별도 context 파일들로 분리

// todo: 로그인하지 않은 사용자에 대해 홈으로 리다이렉팅
const App = () => {
  const [someData, setSomeData] = useState();

  return (
    <Router>
      <GlobalContext.Provider value={someData}>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/users/:user_id" element={<ProfilePage />} />
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
      </GlobalContext.Provider>
    </Router>
  );
};

export default App;
