const formatMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
};

export const logger = {
  info(message) {
    console.log(formatMessage('info', message));
  },
  error(message) {
    console.error(formatMessage('error', message));
  },
};
