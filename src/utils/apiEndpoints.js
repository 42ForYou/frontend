export const API_ENDPOINTS = {
  LOGIN: "/login",
  OAUTH_REDIRECT: (code) => `/oauth/?code=${code}`,
  VALID: "/valid",
  VALIDATE_2FA: (code) => `/valid/2fa?code=${code}`,
  USER_PROFILE: (nickname) => `api/accounts/profiles/${nickname}/`,
  USER_SEARCH: (page, page_size, keyword) => {
    return `/api/accounts/search?search=${keyword}&page=${page}&page_size=${page_size}`;
  },
  ROOM: (roomId) => `/api/game/game_rooms/${roomId}`,
  ROOM_LIST: (filter, page, page_size) => {
    if (filter && page && page_size) {
      if (filter === "all") return `api/game/game_rooms/?page=${page}&page_size=${page_size}`;
      else return `api/game/game_rooms/?filter=${filter}&page=${page}&page_size=${page_size}`;
    }
    return "api/game/game_rooms/";
  },
  PLAYERS: (player_id) => {
    if (player_id) return `api/game/players/${player_id}`;
    return "api/game/players/";
  },
  FRIENDS: (filter, page, page_size) => {
    if (filter && page && page_size) {
      if (filter === "all") return `api/friends/?page=${page}&page_size=${page_size}`;
      else return `api/friends/?filter=${filter}&page=${page}&page_size=${page_size}`;
    }
    return "api/friends/";
  },
};
