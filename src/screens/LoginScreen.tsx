import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
}

export default function LoginScreen({ onLoginSuccess, onGoToRegister }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }

    setErrorMessage('');

    // Credenciales por defecto o las registradas por AsyncStorage
    if (username === 'admin' && password === '1234') {
      onLoginSuccess();
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('@registered_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (username === user.username && password === user.password) {
          onLoginSuccess();
          return;
        }
      }
      setErrorMessage('Usuario o contraseña incorrectos.');
    } catch (error) {
      setErrorMessage('Error al validar las credenciales.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurante Mexicano</Text>
      <Text style={styles.subtitle}>Inicie sesión para continuar</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={onGoToRegister}>
        <Text style={styles.registerButtonText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f6fa', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#2f3640' },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#718093' },
  errorText: { color: '#e84118', marginBottom: 15, fontWeight: '600', textAlign: 'center' },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: '#dcdde1', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  button: { width: '100%', height: 50, backgroundColor: '#e84118', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 15 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  registerButton: { marginTop: 10 },
  registerButtonText: { color: '#e84118', fontSize: 14, fontWeight: '600' }
});