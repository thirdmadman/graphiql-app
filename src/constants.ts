export const SESSION_EXPIRES_IN = process.env.SESSION_EXPIRES_IN
  ? parseInt(process.env.SESSION_EXPIRES_IN, 10)
  : 1000 * 60 * 60 * 24 * 5;
