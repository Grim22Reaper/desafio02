import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface MenuScreenProps {
    onNavigate: (screen: 'catalog' | 'order' | 'history') => void;
    onLogout: () => void;
}

export default function MenuScreen({ onNavigate, onLogout }: MenuScreenProps) {
    return (
        <View style={styles.container}>
        <Text style={styles.title}> Menú Principal</Text>
        <Text style={styles.subtitle}>Seleccione una opción</Text>

        <TouchableOpacity style={styles.menuButton} onPress={() => onNavigate('catalog')}>
        <Text style={styles.buttonText}> Ver Catálogo (Alimentos y Bebidas)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => onNavigate('order')}>
        <Text style={styles.buttonText}> Ver Orden Actual</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => onNavigate('history')}>
        <Text style={styles.buttonText}> Historial de Compras</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f6fa', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#2f3640', marginBottom: 5 },
    subtitle: { fontSize: 14, color: '#718093', marginBottom: 30 },
    menuButton: { width: '100%', backgroundColor: '#e84118', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    logoutButton: { width: '100%', backgroundColor: '#c23616', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
    logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});