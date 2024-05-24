declare global {
  interface Window {
    getEnv: (variableKey: string) => string;
  }
}

export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const REACT_APP_SITE_URL = process.env.REACT_APP_SITE_URL;
export const REACT_APP_RECAPTCHA = process.env.REACT_APP_RECAPTCHA;
