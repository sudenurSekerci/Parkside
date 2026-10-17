import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile } from '../types/auth';

const USERS_KEY = '@parkside/users';
const SESSION_KEY = '@parkside/session_phone';

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

async function readUsers(): Promise<Record<string, UserProfile>> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  if (!raw) return {};
  return JSON.parse(raw) as Record<string, UserProfile>;
}

async function writeUsers(users: Record<string, UserProfile>): Promise<void> {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function registerUser(profile: UserProfile): Promise<void> {
  const phone = normalizePhone(profile.phone);
  const users = await readUsers();
  if (users[phone]) {
    throw new Error('Bu telefon numarası zaten kayıtlı.');
  }
  users[phone] = { ...profile, phone };
  await writeUsers(users);
  await AsyncStorage.setItem(SESSION_KEY, phone);
}

export async function loginUser(phone: string, password: string): Promise<UserProfile> {
  const key = normalizePhone(phone);
  const users = await readUsers();
  const user = users[key];
  if (!user || user.password !== password) {
    throw new Error('Telefon numarası veya şifre hatalı.');
  }
  await AsyncStorage.setItem(SESSION_KEY, key);
  return user;
}

export async function getSessionUser(): Promise<UserProfile | null> {
  const phone = await AsyncStorage.getItem(SESSION_KEY);
  if (!phone) return null;
  const users = await readUsers();
  return users[phone] ?? null;
}

export async function updateUserVehicle(
  phone: string,
  plate: string,
  vehicleType: UserProfile['vehicleType']
): Promise<UserProfile> {
  const key = normalizePhone(phone);
  const users = await readUsers();
  const user = users[key];
  if (!user) {
    throw new Error('Kullanıcı bulunamadı.');
  }
  const updated: UserProfile = {
    ...user,
    plate: plate.trim().toUpperCase(),
    vehicleType,
    onboardingComplete: true,
  };
  users[key] = updated;
  await writeUsers(users);
  return updated;
}

export async function logoutUser(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export { normalizePhone };
