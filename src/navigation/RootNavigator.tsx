import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { VehicleSetupScreen } from '../screens/VehicleSetupScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import type { AuthStackParamList, RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1a3a2f',
    card: '#1a3a2f',
    text: '#ffffff',
    border: '#3d5c4f',
    primary: '#7dd3a8',
  },
};

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a3a2f' },
        headerTintColor: '#ffffff',
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#1a3a2f' },
      }}
    >
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş' }} />
      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ title: 'Kayıt' }} />
    </AuthStack.Navigator>
  );
}

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#7dd3a8" />
      </View>
    );
  }

  const showAuth = !user;
  const showVehicleSetup = user && !user.onboardingComplete;
  const showHome = user && user.onboardingComplete;

  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {showAuth ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : null}
        {showVehicleSetup ? (
          <RootStack.Screen name="VehicleSetup" component={VehicleSetupScreen} />
        ) : null}
        {showHome ? <RootStack.Screen name="Home" component={HomeScreen} /> : null}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#1a3a2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
