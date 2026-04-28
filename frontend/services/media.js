import { getBackendOrigin } from './runtime';

const API_ORIGIN = getBackendOrigin();

export const resolveMediaUrl = (value) => {
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('blob:') || value.startsWith('data:')) {
    return value;
  }
  if (value.startsWith('/')) {
    return `${API_ORIGIN}${value}`;
  }
  return value;
};

export const getAvatarUrl = (user) => {
  if (user?.profilePic) {
    return resolveMediaUrl(user.profilePic);
  }

  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`;
};
