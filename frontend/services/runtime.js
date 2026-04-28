const DEV_BACKEND_ORIGIN = 'http://localhost:5001';
const PROD_BACKEND_ORIGIN = 'https://unilink-gvnu.onrender.com';

const stripTrailingSlash = (value) => value.replace(/\/+$/, '');

export const getBackendOrigin = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  if (envUrl) {
    return stripTrailingSlash(envUrl);
  }

  if (!import.meta.env.PROD) {
    return DEV_BACKEND_ORIGIN;
  }

  return PROD_BACKEND_ORIGIN;
};

export const getApiBaseUrl = () => `${getBackendOrigin()}/api`;
