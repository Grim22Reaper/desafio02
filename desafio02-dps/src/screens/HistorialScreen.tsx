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
    
}