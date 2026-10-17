import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthInput } from '../components/AuthInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (phone.replace(/\D/g, '').length < 10) {
      next.phone = 'Geçerli bir telefon numarası girin.';
    }
    if (password.length < 6) {
      next.password = 'Şifre en az 6 karakter olmalı.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await login(phone, password);
    } catch (e) {
      Alert.alert('Giriş başarısız', e instanceof Error ? e.message : 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Giriş Yap</Text>
        <Text style={styles.subtitle}>Telefon numaranız ve şifrenizle devam edin.</Text>

        <AuthInput
          label="Telefon numarası"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="05XX XXX XX XX"
          error={errors.phone}
        />
        <AuthInput
          label="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
          error={errors.password}
        />

        <PrimaryButton title="Giriş Yap" onPress={onSubmit} loading={loading} />

        <PrimaryButton
          title="Kayıt ekranına dön"
          variant="ghost"
          onPress={() => navigation.navigate('Register')}
          style={styles.linkBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#1a3a2f' },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#b8c9c0',
    marginBottom: 24,
    lineHeight: 22,
  },
  linkBtn: {
    marginTop: 8,
  },
});
