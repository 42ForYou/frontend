export const API_ENDPOINTS = {
  LOGIN: "/login",
  OAUTH_REDIRECT: (code) => `/oauth/?code=${code}`,
  VALID: "/valid",
  USER_PROFILE: (nickname) => `/accounts/profiles/${nickname}`,
  ROOM_LIST: (is_tournament, page, page_size) =>
    `/game/game_rooms/?is_tournament=${is_tournament}&page=${page}&page_size=${page_size}`,
};
