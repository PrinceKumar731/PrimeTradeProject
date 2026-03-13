const USER_KEY = 'task_manager_user';

export const getStoredUser = () => {
  const rawUser = window.localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch (error) {
    window.localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const setStoredUser = (user) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearStoredUser = () => {
  window.localStorage.removeItem(USER_KEY);
};
