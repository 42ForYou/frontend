export const API_ENDPOINTS = {
  LOGIN: "/login",
  OAUTH_REDIRECT: (code) => `/oauth/?code=${code}`,
  VALID: "/valid",
  USER_PROFILE: (nickname) => `api/accounts/profiles/${nickname}`,
  ROOM_LIST: (type, page, page_size) => {
    if (type && page && page_size) return `api/game/game_rooms/?filter=${type}&page=${page}&page_size=${page_size}`;
    return "api/game/game_rooms/";
  },
};
