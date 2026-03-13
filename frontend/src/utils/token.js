const TOKEN_KEY = 'task_manager_token';

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};
