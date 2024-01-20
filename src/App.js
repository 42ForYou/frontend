import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import FriendsPage from "./pages/FriendsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RoomListPage from "./pages/RoomListPage";
import ChatPage from "./pages/ChatPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";

import Navi from "./Navi";

export const GlobalContext = createContext(); // 정보가 많아질시 차후 별도 context 파일들로 분리

const App = () => {
  const [someData, setSomeData] = useState();

  return (
    <Router>
      <GlobalContext.Provider value={someData}>
        <div className="App">
          <Navi />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/roomlist" element={<RoomListPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/user" element={<UserPage />} />
            {/* fallback page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </GlobalContext.Provider>
    </Router>
  );
};

export default App;
