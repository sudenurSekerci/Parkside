import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { RegisterForm, UserProfile, VehicleType } from '../types/auth';
import {
  getSessionUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserVehicle,
} from '../storage/userStorage';

type AuthContextValue = {
  user: UserProfile | null;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (form: RegisterForm) => Promise<void>;
  completeVehicleSetup: (plate: string, vehicleType: VehicleType) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSessionUser()
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (phone: string, password: string) => {
    const loggedIn = await loginUser(phone, password);
    setUser(loggedIn);
  }, []);

  const register = useCallback(async (form: RegisterForm) => {
    const digits = form.cardNumber.replace(/\D/g, '');
    const profile: UserProfile = {
      fullName: form.fullName.trim(),
      phone: form.phone,
      password: form.password,
      cardLast4: digits.slice(-4),
      onboardingComplete: false,
    };
    await registerUser(profile);
    setUser(profile);
  }, []);

  const completeVehicleSetup = useCallback(
    async (plate: string, vehicleType: VehicleType) => {
      if (!user) throw new Error('Oturum bulunamadı.');
      const updated = await updateUserVehicle(user.phone, plate, vehicleType);
      setUser(updated);
    },
    [user]
  );

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, register, completeVehicleSetup, logout }),
    [user, isLoading, login, register, completeVehicleSetup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth yalnızca AuthProvider içinde kullanılabilir.');
  }
  return ctx;
}
