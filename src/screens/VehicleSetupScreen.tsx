import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AuthInput } from '../components/AuthInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import type { VehicleType } from '../types/auth';

const VEHICLE_OPTIONS: VehicleType[] = ['Hatchback', 'Sedan', 'SUV', 'Ticari'];

export function VehicleSetupScreen() {
  const { completeVehicleSetup } = useAuth();
  const [plate, setPlate] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ plate?: string; vehicleType?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    const normalized = plate.trim();
    if (normalized.length < 5) {
      next.plate = 'Geçerli bir plaka girin.';
    }
    if (!vehicleType) {
      next.vehicleType = 'Araç tipi seçin.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate() || !vehicleType) return;
    setLoading(true);
    try {
      await completeVehicleSetup(plate, vehicleType);
    } catch (e) {
      Alert.alert('Kayıt tamamlanamadı', e instanceof Error ? e.message : 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Aracınızı tanımlayın</Text>
      <Text style={styles.subtitle}>
        Plakanızı girin ve aracınızın tipini seçin. Bu bilgiler park işlemleriniz için
        kullanılacak.
      </Text>

      <AuthInput
        label="Plaka"
        value={plate}
        onChangeText={setPlate}
        autoCapitalize="characters"
        placeholder="34 ABC 123"
        error={errors.plate}
      />

      <Text style={styles.sectionLabel}>Araç tipi</Text>
      <View style={styles.grid}>
        {VEHICLE_OPTIONS.map((option) => {
          const selected = vehicleType === option;
          return (
            <Pressable
              key={option}
              onPress={() => setVehicleType(option)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {errors.vehicleType ? <Text style={styles.error}>{errors.vehicleType}</Text> : null}

      <PrimaryButton
        title="Uygulamaya Geç"
        onPress={onSubmit}
        loading={loading}
        style={styles.submit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a3a2f',
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
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e8f0ec',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3d5c4f',
    backgroundColor: '#243d33',
    minWidth: '47%',
    alignItems: 'center',
  },
  chipSelected: {
    borderColor: '#7dd3a8',
    backgroundColor: '#2f5244',
  },
  chipText: {
    color: '#c5d5cc',
    fontWeight: '600',
    fontSize: 15,
  },
  chipTextSelected: {
    color: '#7dd3a8',
  },
  error: {
    marginTop: 8,
    fontSize: 12,
    color: '#ffb4b4',
  },
  submit: {
    marginTop: 28,
  },
});
