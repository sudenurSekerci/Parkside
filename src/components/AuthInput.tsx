import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export function AuthInput({ label, error, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#8a9a94"
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e8f0ec',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#243d33',
    borderWidth: 1,
    borderColor: '#3d5c4f',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#ffffff',
  },
  inputError: {
    borderColor: '#e57373',
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    color: '#ffb4b4',
  },
});
