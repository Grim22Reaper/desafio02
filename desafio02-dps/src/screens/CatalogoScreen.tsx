import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, Image, TouchableOpacity, Alert } from 'react-native';
import { Menu_Data , Productos } from '../data/menuData';

const SECTIONS = [
    {
    title: 'Alimentos',
    data: Menu_Data.filter(item => item.category === 'alimentos')
    },
    {
    title: 'Bebidas',
    data: Menu_Data.filter(item => item.category === 'bebidas')
    },
];

export default function CatalogoScreen() {
    
    const [ quantity, setQuantity ] = useState<{ [key: string]: number }>({});

    const handleQuantityChange = (id: number, delta: number) => {
        const currentQty = quantity[id] || 0;
        const newQty = currentQty + delta;

        if (newQty < 0) return;
        if (newQty > 20) {
        Alert.alert('Cantidad máxima alcanzada', 'No puedes agregar más de 20 unidades');
            return;
        }

        setQuantity({
            ...quantity,
            [id]: newQty,
        });
    };

    const renderItem = ({ item }: { item: Productos }) => {
        const qty = quantity[item.id] || 0;

        return(
            <View style={styles.card}>
        <Image source={{ uri: item.imagen}} style={styles.image} />
        <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.prices.toFixed(2)}</Text>
        
          {/* Selector de cantidad */}
        <View style={styles.counterContainer}>
            <TouchableOpacity 
            style={styles.counterButton} 
            onPress={() => handleQuantityChange(item.id, -1)}
            >
            <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.qtyText}>{qty}</Text>
            
            <TouchableOpacity 
            style={styles.counterButton} 
            onPress={() => handleQuantityChange(item.id, 1)}
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
        <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.listContainer}
        />
    </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  listContainer: { padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: 'bold', backgroundColor: '#e84118', color: '#fff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, marginVertical: 10 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, padding: 10, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  image: { width: 80, height: 80, borderRadius: 6 },
  infoContainer: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
  price: { fontSize: 14, color: '#e84118', marginVertical: 4, fontWeight: '600' },
  counterContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  counterButton: { backgroundColor: '#f1f2f6', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 4, borderWidth: 1, borderColor: '#dcdde1' },
  counterButtonText: { fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
  qtyText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold', color: '#2f3640' },
});
    
