// Library
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
const TOKEN = 'TOKEN';

export const setToken = async (token: string | null) => {
  if (!token) return;
  await AsyncStorage.setItem(TOKEN, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN);
};

export const resetToken = async () => {
  await AsyncStorage.removeItem(TOKEN);
};
