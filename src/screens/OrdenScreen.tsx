import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'alimento' | 'bebida';
  quantity: number;
}

interface OrdenScreenProps {
  cart: CartItem[];
  onUpdateCart: (updatedCart: CartItem[]) => void;
  onClearCart: () => void;
  onSaveOrder: (order: any) => void;
}

export default function OrdenScreen({ cart, onUpdateCart, onClearCart, onSaveOrder }: OrdenScreenProps) {

  // Manejar cambios de cantidad directamente en el carrito
  const handleQuantityChange = (item: CartItem, delta: number) => {
    const newQty = item.quantity + delta;

    if (newQty > 20) {
      Alert.alert('Límite alcanzado', 'El límite máximo por producto es de 20 unidades.');
      return;
    }

    const updatedCart = cart.map(prod => {
      if (prod.id === item.id) {
        return { ...prod, quantity: newQty };
      }
      return prod;
    }).filter(prod => prod.quantity > 0); // Si llega a 0, se remueve del carrito

    onUpdateCart(updatedCart);
  };

  // Cálculos de subtotales e impuestos
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.13; // 13% de IVA estándar
  const total = subtotal + tax;

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos antes de confirmar tu orden.');
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: cart,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };

    onSaveOrder(newOrder);
    onClearCart();
    Alert.alert('¡Éxito!', 'Tu orden ha sido confirmada y guardada en el historial.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Resumen del Carrito</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)} (${item.price.toFixed(2)} c/u)</Text>
            </View>

            {/* Controles para aumentar, disminuir o eliminar */}
            <View style={styles.counterContainer}>
              <TouchableOpacity 
                style={styles.counterButton} 
                onPress={() => handleQuantityChange(item, -1)}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.qtyText}>{item.quantity}</Text>
              
              <TouchableOpacity 
                style={styles.counterButton} 
                onPress={() => handleQuantityChange(item, 1)}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
        }
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.row}><Text>Subtotal:</Text><Text>${subtotal.toFixed(2)}</Text></View>
          <View style={styles.row}><Text>IVA (13%):</Text><Text>${tax.toFixed(2)}</Text></View>
          <View style={[styles.row, styles.totalRow]}><Text style={styles.totalText}>Total:</Text><Text style={styles.totalText}>${total.toFixed(2)}</Text></View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>Confirmar Orden</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2f3640', marginBottom: 15 },
  listContainer: { paddingBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 10, alignItems: 'center', justifyContent: 'space-between', elevation: 2 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
  itemPrice: { fontSize: 14, color: '#000000', marginTop: 4 },
  counterContainer: { flexDirection: 'row', alignItems: 'center' },
  counterButton: { backgroundColor: '#f1f2f6', width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 1, borderColor: '#dcdde1' },
  counterButtonText: { fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
  qtyText: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
  emptyText: { textAlign: 'center', color: '#718093', marginTop: 40, fontSize: 16 },
  footer: { backgroundColor: '#fff', padding: 15, borderRadius: 8, elevation: 3, marginTop: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalRow: { borderTopWidth: 1, borderTopColor: '#dcdde1', paddingTop: 8, marginTop: 4 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#2f3640' },
  confirmButton: { backgroundColor: '#0c4204', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});