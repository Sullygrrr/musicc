import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  ActionCodeSettings
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function generateUsername() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `user${result}`;
}

const actionCodeSettings: ActionCodeSettings = {
  url: window.location.origin,
  handleCodeInApp: true,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const username = generateUsername();
      await updateProfile(userCredential.user, { displayName: username });
    } catch (error) {
      console.error('Error in signup process:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  };

  const updateUserProfile = async (displayName: string, photoURL: string) => {
    if (!auth.currentUser) throw new Error('No user logged in');
    await updateProfile(auth.currentUser, { displayName, photoURL });
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      logout,
      resetPassword,
      updateUserProfile
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}