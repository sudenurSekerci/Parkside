import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.badgeWrap}>
          <Text style={styles.badge}>Parkside</Text>
        </View>
        <Text style={styles.title}>Park yerinizi kolayca yönetin</Text>
        <Text style={styles.subtitle}>
          Devam etmek için giriş yapın veya yeni hesap oluşturun.
        </Text>
      </View>
      <View style={styles.actions}>
        <PrimaryButton title="Giriş Yap" onPress={() => navigation.navigate('Login')} />
        <PrimaryButton
          title="Kayıt Ol"
          variant="secondary"
          onPress={() => navigation.navigate('Register')}
          style={styles.secondaryBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a3a2f',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  hero: {
    gap: 12,
  },
  badgeWrap: {
    alignSelf: 'flex-start',
    backgroundColor: '#2f5244',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badge: {
    color: '#7dd3a8',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: '#b8c9c0',
    lineHeight: 24,
  },
  actions: {
    gap: 12,
  },
  secondaryBtn: {
    marginTop: 4,
  },
});
