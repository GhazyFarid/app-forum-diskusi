const baseUrl = 'https://forum-api.dicoding.dev/v1';

const ApiService = {
  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  users: `${baseUrl}/users`,
  threads: `${baseUrl}/threads`,
  leaderboards: `${baseUrl}/leaderboards`,
};

export default ApiService;
