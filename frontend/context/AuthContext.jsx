import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const buildMultipartForm = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return formData;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncUser = (nextUser) => {
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  };

  const refreshUser = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        return { success: false, message: 'No active session' };
      }

      const { data } = await api.get('/users/profile');
      const freshUser = { ...(user || {}), ...data, token: storedToken };
      syncUser(freshUser);
      return { success: true, user: freshUser };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to refresh user' };
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          try {
            const { data } = await api.get('/users/profile');
            const freshUser = { ...parsed, ...data, token: storedToken };
            syncUser(freshUser);
          } catch {}
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (!data || !data.token || !data.user) throw new Error('Invalid server response');
      localStorage.setItem('token', data.token);
      syncUser(data.user);
      return { success: true, name: data.user.name };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const { data } = await api.put('/users/profile', userData);
      const newUserData = { ...user, ...data };
      syncUser(newUserData);
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Update failed' };
    }
  };

  const updateProfilePic = async (file) => {
    try {
      const formData = buildMultipartForm(file);
      const { data } = await api.put('/users/profile-pic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newUserData = { ...user, ...data };
      syncUser(newUserData);
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Profile picture update failed' };
    }
  };

  const updateBanner = async (file) => {
    try {
      const formData = buildMultipartForm(file);
      const { data } = await api.put('/users/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newUserData = { ...user, ...data };
      syncUser(newUserData);
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Banner update failed' };
    }
  };

  const toggleFollow = async (targetUserId) => {
    if (!user?._id || !targetUserId) {
      return { success: false, message: 'User information is missing' };
    }

    const currentFollowing = (user.following || []).map((item) =>
      item?._id ? String(item._id) : String(item)
    );
    const targetId = String(targetUserId);
    const isFollowing = currentFollowing.includes(targetId);
    const optimisticFollowing = isFollowing
      ? currentFollowing.filter((id) => id !== targetId)
      : [...currentFollowing, targetId];

    const optimisticUser = { ...user, following: optimisticFollowing };
    syncUser(optimisticUser);

    try {
      const endpoint = isFollowing ? `/users/${targetId}/unfollow` : `/users/${targetId}/follow`;
      const { data } = await api.put(endpoint);
      const nextUser = { ...optimisticUser, ...(data.updatedCurrentUser || {}) };
      syncUser(nextUser);
      return { success: true, isNowFollowing: !isFollowing, data };
    } catch (error) {
      syncUser(user);
      return { success: false, message: error.response?.data?.message || 'Failed to update follow status' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      updateProfilePic,
      updateBanner,
      toggleFollow,
      refreshUser,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
