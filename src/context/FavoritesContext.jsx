import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { addFavorite, removeFavorite, fetchFavoriteIds } from '../firebase/db';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavoriteIds([]);
        return;
      }
      const ids = await fetchFavoriteIds(user.uid);
      setFavoriteIds(ids);
    };
    loadFavorites();
  }, [user]);

  const isFavorite = useCallback((teacherId) => favoriteIds.includes(teacherId), [favoriteIds]);

  const toggleFavorite = useCallback(
    async (teacherId) => {
      if (!user) return;

      if (favoriteIds.includes(teacherId)) {
        setFavoriteIds((prev) => prev.filter((id) => id !== teacherId));
        await removeFavorite(user.uid, teacherId);
      } else {
        setFavoriteIds((prev) => [...prev, teacherId]);
        await addFavorite(user.uid, teacherId);
      }
    },
    [favoriteIds, user],
  );

  const value = { favoriteIds, isFavorite, toggleFavorite };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
