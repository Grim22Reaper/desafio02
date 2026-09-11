import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Order {
    id: string;
    date: string;
    items: Array<{ id: string; name: string; price: number; quantity: number }>;
    total: number;
}

export default function HistorialScreen() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const storedOrders = await AsyncStorage.getItem('@order_history');
            if (storedOrders) {
                const parsedOrders: Order[] = JSON.parse(storedOrders);
                parsedOrders.sort((a, b) => Number(b.id) - Number(a.id));
                setOrders(parsedOrders);
            }
        } catch (error) {
            console.error('Error al cargar el historial:', error);
        }
    };
    
return (
    <View style={styles.container}>
    <Text style={styles.headerTitle}>Historial de Órdenes</Text>

    {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay órdenes confirmadas anteriormente.</Text>
        </View>
        ) : (
        <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.orderCard}>
            <Text style={styles.orderDate}>Fecha: {item.date}</Text>
            <View style={styles.divider} />
            
            {item.items.map((prod, index) => (
                <Text key={index} style={styles.productText}>
                  • {prod.quantity}x {prod.name} - ${(prod.price * prod.quantity).toFixed(2)}
                </Text>
            ))}

            <View style={styles.divider} />
            <Text style={styles.orderTotal}>Total Pagado: ${item.total.toFixed(2)}</Text>
            </View>
            )}
        />
    )}
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f6fa', padding: 15 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2f3640', marginBottom: 15, textAlign: 'center' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#718093' },
    orderCard: { backgroundColor: '#fff', borderRadius: 8, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
    orderDate: { fontSize: 14, fontWeight: 'bold', color: '#000000', marginBottom: 5 },
    divider: { height: 1, backgroundColor: '#dcdde1', marginVertical: 8 },
    productText: { fontSize: 14, color: '#2f3640', marginVertical: 2 },
    orderTotal: { fontSize: 16, fontWeight: 'bold', color: '#2f3640', textAlign: 'right', marginTop: 5 }
});