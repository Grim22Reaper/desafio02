import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface OrdenScreenProps {
    cart: CartItem[];
    onClearCart: () => void;
    onSaveOrder: (order: any) => void;
}

export default function OrdenScreen({ cart, onClearCart, onSaveOrder }: OrdenScreenProps) {

    const activeItems = cart.filter(item => item.quantity > 0);
    const subtotalgeneral = activeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const iva = subtotalgeneral * 0.13;
    const totalFinal = subtotalgeneral + iva;

    const handleConfirmOrder = () => {

        if (activeItems.length === 0) {
            Alert.alert('Error', 'No se puede confirmar una orden vacía. Seleccione al menos un producto.');
            return;
        }

        Alert.alert(
            'confirmar Orden',
            `¿Desea confirmar la orden por $${totalFinal.toFixed(2)}?`,
            [
                {text: 'cancelar', style: 'cancel'},
                {
                    text: 'Si, Confirmar',
                    onPress: () => {
                        const newOrder = {
                        id: Date.now().toString(),
                        date: new Date().toLocaleString(),
                        items: activeItems,
                        total: totalFinal,
                        
                    };
                    onSaveOrder(newOrder);
                    onClearCart();
                    Alert.alert('Orden Confirmada', 'Su orden ha sido confirmada con éxito.');
                }
            }
        ]
    );
};

return (
    <View style={styles.container}>
    <Text style={styles.headerTitle}>Orden Actual</Text>

        {activeItems.length === 0 ? (
        <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay productos en la orden actual.</Text>
        </View>
        ) : (
        <>
        <FlatList
            data={activeItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                    {item.quantity} x ${item.price.toFixed(2)}
                </Text>
                </View>
                <Text style={styles.itemSubtotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
            </View>
            )}
            style={styles.list}
        />

            <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal:</Text>
            <Text style={styles.summaryText}>${subtotalgeneral.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>IVA (13%):</Text>
            <Text style={styles.summaryText}>${iva.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total Final:</Text>
            <Text style={styles.totalText}>${totalFinal.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>Confirmar Orden</Text>
            </TouchableOpacity>
            </View>
        </>
        )}
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f6fa', padding: 15 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2f3640', marginBottom: 15, textAlign: 'center' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#718093' },
    list: { flex: 1 },
    itemRow: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
    itemName: { fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
    itemDetails: { fontSize: 14, color: '#718093', marginTop: 2 },
    itemSubtotal: { fontSize: 16, fontWeight: 'bold', color: '#e84118' },
    summaryContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginTop: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    summaryText: { fontSize: 15, color: '#718093' },
    totalRow: { borderTopWidth: 1, borderTopColor: '#dcdde1', paddingTop: 10, marginTop: 5 },
    totalText: { fontSize: 18, fontWeight: 'bold', color: '#2f3640' },
    confirmButton: { backgroundColor: '#44bd32', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
    confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
