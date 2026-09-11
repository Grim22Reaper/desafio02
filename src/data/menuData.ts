export interface Product {
  id: string; // O number, según prefieras manejarlo
  name: string;
  price: number;
  image: string;
  category: 'alimento' | 'bebida';
}

export const MENU_ITEMS: Product[] = [
    // Platillos
    {id: '1', name: 'Tacos al pastor', price: 7.50, image: require('../../assets/tacos al pastor.jpg'), category: 'alimento'},
    {id: '2', name: 'Tacos de carnitas', price: 6.50, image: require('../../assets/tacos_de_carnitas.jpg'), category: 'alimento'},
    {id: '3', name: 'Tacos de barbacoa', price: 8.00, image: require('../../assets/Tacos-de-Barbacoa.jpg'), category: 'alimento'},
    {id: '4', name: 'Tacos de birria', price: 9.00, image: require('../../assets/tacos de birria.jpg'), category: 'alimento'},
    {id: '5', name: 'Tacos de pollo', price: 6.00, image: require('../../assets/tacos de pollo.jpg'), category: 'alimento'},
    {id: '6', name: 'Burrito de pastor', price: 8.50, image: require('../../assets/burritos de pastor.jpg'), category: 'alimento'},
    {id: '7', name: 'Burrito de carnitas', price: 7.50, image: require('../../assets/burrito de carnitas.jpg') , category: 'alimento'},
    {id: '8', name: 'Quesadilla', price: 5.00, image: require('../../assets/quesadilla.jpg') , category: 'alimento'},
    {id: '9', name: 'Posole', price: 6.50, image: require('../../assets/Pozole-Recipe-10.jpg'), category: 'alimento'},
    {id: '10', name: 'Tamales', price: 4.50, image: require('../../assets/Pork-Tamales-Rojos-sauce.jpg') , category: 'alimento'},

    // Bebidas
    {id: '11', name: 'Horchata', price: 2.00, image: require('../../assets/Horchata-14.jpg'), category: 'bebida'},
    {id: '12', name: 'Coca-Cola', price: 1.50, image: require('../../assets/coca-cola.jpg'), category: 'bebida'},
    {id: '13', name: 'Agua de Jamaica', price: 1.50, image: require('../../assets/l-intro-1674136791.jpg'), category: 'bebida'},
    {id: '14', name: 'Agua de tamarindo', price: 1.50, image: require('../../assets/tamarind-water.jpg'), category: 'bebida'},
    {id: '15', name: 'Limonada', price: 1.50, image: require('../../assets/limonada.jpg'), category: 'bebida'},
];