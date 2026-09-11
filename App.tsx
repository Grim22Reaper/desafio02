import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CatalogScreen from './src/screens/CatalogoScreen';
import OrdenScreen from './src/screens/OrdenScreen';
import HistorialScreen from './src/screens/HistorialScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentScreen, setCurrentScreen] = useState<'catalog' | 'order' | 'history'>('catalog');
  const [cart, setCart] = useState<any[]>([]);

  const handleSaveOrder = async (newOrder: any) => {
    try {
      const existingHistory = await AsyncStorage.getItem('@order_history');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      const updatedHistory = [newOrder, ...history];
      await AsyncStorage.setItem('@order_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  if (!isLoggedIn) {
    if (authView === 'register') {
      return (
        <RegisterScreen 
          onRegisterSuccess={() => setAuthView('login')} 
          onBackToLogin={() => setAuthView('login')} 
        />
      );
    }
    return (
      <LoginScreen 
        onLoginSuccess={() => setIsLoggedIn(true)} 
        onGoToRegister={() => setAuthView('register')} 
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de navegación superior cuando estamos en Orden o Historial */}
      {currentScreen !== 'catalog' && (
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('catalog')}>
            <Text style={styles.backButtonText}>⬅ Volver al Catálogo</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.content}>
        {currentScreen === 'catalog' && (
          <CatalogScreen 
            cart={cart} 
            onUpdateCart={(updatedCart) => setCart(updatedCart)} 
            onGoToOrder={() => setCurrentScreen('order')} 
            onGoToHistory={() => setCurrentScreen('history')} 
          />
        )}
        {currentScreen === 'order' && (
          <OrdenScreen 
            cart={cart} 
            onClearCart={handleClearCart} 
            onSaveOrder={handleSaveOrder} 
          />
        )}
        {currentScreen === 'history' && <HistorialScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  navBar: { paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#dcdde1' },
  backButton: { backgroundColor: '#718093', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, alignSelf: 'flex-start' },
  backButtonText: { color: '#fff', fontWeight: 'bold' },
  content: { flex: 1 }
});