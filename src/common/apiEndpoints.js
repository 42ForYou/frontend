export const API_ENDPOINTS = {
  LOGIN: "/login",
  OAUTH_REDIRECT: (code) => `/oauth/?code=${code}`,
  VALID: "/valid",
  USER_PROFILE: (nickname) => `api/accounts/profiles/${nickname}/`,
  USER_SEARCH: (keyword) => `/api/accounts/search?search=${keyword}`,
  ROOM: (roomId) => `/api/game/game_rooms/${roomId}`,
  ROOM_LIST: (type, page, page_size) => {
    if (type && page && page_size) {
      if (type === "all") return `api/game/game_rooms/?page=${page}&page_size=${page_size}`;
      else return `api/game/game_rooms/?filter=${type}&page=${page}&page_size=${page_size}`;
    }
    return "api/game/game_rooms/";
  },
  PLAYERS: (player_id) => {
    if (player_id) return `api/game/players/${player_id}`;
    return "api/game/players/";
  },
  FRIENDS: (type, page, page_size) => {
    if (type && page && page_size) {
      if (type === "all") return `api/friends/?page=${page}&page_size=${page_size}`;
      else return `api/friends/?filter=${type}&page=${page}&page_size=${page_size}`;
    }
    return "api/friends/";
  },
};
