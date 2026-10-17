import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthInput } from '../components/AuthInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (fullName.trim().length < 3) {
      next.fullName = 'Ad soyad en az 3 karakter olmalı.';
    }
    if (phone.replace(/\D/g, '').length < 10) {
      next.phone = 'Geçerli bir telefon numarası girin.';
    }
    if (password.length < 6) {
      next.password = 'Şifre en az 6 karakter olmalı.';
    }
    const cardDigits = cardNumber.replace(/\D/g, '');
    if (cardDigits.length < 16) {
      next.cardNumber = 'Kart numarası 16 haneli olmalı.';
    }
    if (cvv.replace(/\D/g, '').length < 3) {
      next.cvv = 'Geçerli bir CVV girin.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await register({ fullName, phone, password, cardNumber, cvv });
    } catch (e) {
      Alert.alert('Kayıt başarısız', e instanceof Error ? e.message : 'Bir hata oluştu.');
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
        <Text style={styles.title}>Kayıt Ol</Text>
        <Text style={styles.subtitle}>Hesabınızı oluşturun ve park avantajlarına erişin.</Text>

        <AuthInput
          label="Ad-Soyad"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Adınız Soyadınız"
          autoCapitalize="words"
          error={errors.fullName}
        />
        <AuthInput
          label="Telefon numarası"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="05XX XXX XX XX"
          error={errors.phone}
        />
        <AuthInput
          label="Şifre oluşturun"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="En az 6 karakter"
          error={errors.password}
        />
        <AuthInput
          label="Kart numarası"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="number-pad"
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19}
          error={errors.cardNumber}
        />
        <AuthInput
          label="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="number-pad"
          secureTextEntry
          placeholder="XXX"
          maxLength={4}
          error={errors.cvv}
        />

        <PrimaryButton title="Devam Et" onPress={onSubmit} loading={loading} />

        <PrimaryButton
          title="Zaten hesabım var"
          variant="ghost"
          onPress={() => navigation.navigate('Login')}
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
