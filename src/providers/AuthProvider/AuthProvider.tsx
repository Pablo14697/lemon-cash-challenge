// React
import { createContext, useEffect, useState } from 'react';

// Utils
import { getToken, resetToken, setToken } from './utils/authStorage';

type AuthContextType = {
  currentToken: string;
  isSignedIn: boolean;
  loading: boolean;
  setNewToken: (token: string) => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  currentToken: '',
  isSignedIn: false,
  loading: false,
  setNewToken: () => {},
  logOut: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentToken, setCurrentToken] = useState('');
  const [loading, setLoading] = useState(true);

  const forceFakeWaiting = async () => {
    const token = await getToken();

    setTimeout(() => {
      setCurrentToken(token || '');
      setLoading(false);
    }, 1500);
  };

  const checkToken = async () => {
    forceFakeWaiting();
  };

  useEffect(() => {
    setLoading(true);
    checkToken();
  }, [currentToken]);

  const setNewToken = async (token: string) => {
    setCurrentToken(token);
    await setToken(token);
  };

  const logOut = async () => {
    setCurrentToken('');
    await resetToken();
  };

  return (
    <AuthContext.Provider
      value={{
        currentToken,
        isSignedIn: !!currentToken,
        loading,
        setNewToken,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
