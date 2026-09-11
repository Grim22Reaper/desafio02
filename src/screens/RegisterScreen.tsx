import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onBackToLogin: () => void;
}

export default function RegisterScreen({ onRegisterSuccess, onBackToLogin }: RegisterScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    // Validación obligatoria: campos vacíos
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setErrorMessage('');

    try {
      // Guardar las credenciales en AsyncStorage para que el login las reconozca
      await AsyncStorage.setItem('@registered_user', JSON.stringify({ username, password }));
      Alert.alert('¡Éxito!', 'Usuario registrado correctamente. Ahora puede iniciar sesión.', [
        { text: 'OK', onPress: onBackToLogin }
      ]);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setErrorMessage('Ocurrió un error al guardar el registro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <Text style={styles.subtitle}>Cree una nueva cuenta</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nuevo Usuario"
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

      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={onBackToLogin}>
        <Text style={styles.backButtonText}>← Volver al Login</Text>
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
  button: { width: '100%', height: 50, backgroundColor: '#e84118', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backButton: { marginTop: 10 },
  backButtonText: { color: '#718093', fontSize: 14, fontWeight: '600' }
});