export const REMOTE_SERVER_URL = process.env.REMOTE_SERVER_URL || 'http://localhost:5000/api/v1';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:6001';
export const tempTokenName =  process.env.TEMP_TOKEN_NAME || 'auth.temp-token';
export const authTokenName = process.env.AUTH_TOKEN_NAME || 'auth.auth-token';


export const BotColorMapper: Record<string, string> = {
  Positive: "green",
  Negative: "red",
  Neutral: "#1e1c1c",
};