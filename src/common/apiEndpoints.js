export const API_ENDPOINTS = {
  LOGIN: "/login",
  VALID: "/valid",
  USER_PROFILE: (nickname) => `/accounts/profiles/${nickname}`,
  ROOM_LIST: (is_tournament, page, page_size) =>
    `/game/game_rooms/?is_tournament=${is_tournament}&page=${page}&page_size=${page_size}`,
};

// 사용 예시
// import { API_ENDPOINTS } from './apiEndpoints';
// axios.get(API_ENDPOINTS.USER_PROFILE);
