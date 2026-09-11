import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList, Image, TouchableOpacity, Alert } from 'react-native';
import { MENU_ITEMS, Product } from '../data/menuData';

interface CartItem extends Product {
    quantity: number;
}

interface CatalogScreenProps {
    cart: CartItem[];
    onUpdateCart: (updatedCart: CartItem[]) => void;
    onGoToOrder: () => void;
    onGoToHistory: () => void;
    onLogout: () => void;
}

const SECTIONS = [
{
    title: 'Alimentos',
    data: MENU_ITEMS.filter(item => item.category === 'alimento'),
},
{
    title: 'Bebidas',
    data: MENU_ITEMS.filter(item => item.category === 'bebida'),
},
];

export default function CatalogScreen({ cart, onUpdateCart, onGoToOrder, onGoToHistory, onLogout }: CatalogScreenProps) {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    useEffect(() => {
    const initialQtys: { [key: string]: number } = {};
    cart.forEach(item => {
    initialQtys[item.id] = item.quantity;
    });
    setQuantities(initialQtys);
    }, []);

    const handleQuantityChange = (item: Product, delta: number) => {
    const currentQty = quantities[item.id] || 0;
    const newQty = currentQty + delta;

    if (newQty < 0) return;
    if (newQty > 20) {
        Alert.alert('Límite alcanzado', 'El límite máximo por producto es de 20 unidades.');
        return;
    }

    const updatedQtys = {
        ...quantities,
        [item.id]: newQty,
    };
    setQuantities(updatedQtys);

    const newCart: CartItem[] = MENU_ITEMS
        .map(prod => ({
        ...prod,
        quantity: updatedQtys[prod.id] || 0,
        }))
        .filter(prod => prod.quantity > 0);

    onUpdateCart(newCart);
    };

    const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

    const renderItem = ({ item }: { item: Product }) => {
    const qty = quantities[item.id] || 0;

    return (
        <View style={styles.card}>
        <Image 
            source={
                typeof item.image === 'number' 
                    ? item.image 
                    : { uri: item.image }
            } 
            style={styles.image} 
        />
        <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.counterContainer}>
            <TouchableOpacity 
            style={styles.counterButton} 
            onPress={() => handleQuantityChange(item, -1)}
            >
            <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.qtyText}>{qty}</Text>
            
            <TouchableOpacity 
            style={styles.counterButton} 
            onPress={() => handleQuantityChange(item, 1)}
            >
            <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>
    );
    };

    return (
    <View style={styles.container}>
      {/* Barra superior con Título, Botón Historial y Botón Salir */}
    <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Catálogo</Text>
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity style={styles.historyButton} onPress={onGoToHistory}>
            <Text style={styles.headerButtonText}>Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.headerButtonText}>Salir</Text>
          </TouchableOpacity>
        </View>
    </View>

    <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.listContainer}
    />

    {totalItemsInCart > 0 && (
        <TouchableOpacity style={styles.cartButton} onPress={onGoToOrder}>
        <Text style={styles.cartButtonText}>Ver Carrito ({totalItemsInCart} ítems)</Text>
        </TouchableOpacity>
    )}
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f6fa' },
    headerBar: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      paddingHorizontal: 15, 
      paddingBottom: 12,
      paddingTop: 15, 
      backgroundColor: '#fff', 
      borderBottomWidth: 1, 
      borderBottomColor: '#dcdde1' 
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#2f3640' },
    headerButtonsContainer: { flexDirection: 'row', alignItems: 'center' },
    historyButton: { backgroundColor: '#718093', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, marginRight: 8 },
    logoutButton: { backgroundColor: '#718093', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
    headerButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
    listContainer: { padding: 15, paddingBottom: 80 },
    sectionHeader: { fontSize: 18, fontWeight: 'bold', backgroundColor: '#720404', color: '#fff', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, marginVertical: 10 },
    card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, padding: 10, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
    image: { width: 80, height: 80, borderRadius: 6 },
    infoContainer: { flex: 1, marginLeft: 12 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
    price: { fontSize: 14, color: '#000000', marginVertical: 4, fontWeight: '600' },
    counterContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    counterButton: { backgroundColor: '#f1f2f6', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 1, borderColor: '#dcdde1' },
    counterButtonText: { fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
    qtyText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
    cartButton: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#0c4204', padding: 15, borderRadius: 30, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
    cartButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});