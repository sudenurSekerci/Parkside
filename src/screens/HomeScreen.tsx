import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';

export function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Faz 1 tamamlandı</Text>
      <Text style={styles.title}>Hoş geldiniz{user ? `, ${user.fullName.split(' ')[0]}` : ''}</Text>
      <Text style={styles.subtitle}>
        Ana uygulama ekranı burada açılacak. Sonraki fazlarda park, ödeme ve diğer özellikler
        eklenecek.
      </Text>

      {user?.plate && user.vehicleType ? (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Kayıtlı araç</Text>
          <Text style={styles.cardValue}>{user.plate}</Text>
          <Text style={styles.cardMeta}>{user.vehicleType}</Text>
        </View>
      ) : null}

      <PrimaryButton title="Çıkış Yap" variant="secondary" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a3a2f',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
    gap: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    color: '#7dd3a8',
    fontWeight: '700',
    fontSize: 13,
    backgroundColor: '#2f5244',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 15,
    color: '#b8c9c0',
    lineHeight: 22,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#243d33',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3d5c4f',
    marginBottom: 8,
  },
  cardLabel: {
    color: '#8a9a94',
    fontSize: 13,
    marginBottom: 6,
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardMeta: {
    marginTop: 6,
    color: '#7dd3a8',
    fontWeight: '600',
  },
});
