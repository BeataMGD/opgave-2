import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

import styles from '../Styling/styles'; // Importér dine stilarter her

export default function ItemList({ addToCart }) {
  // Lokal state til at holde produkterne
  const [products, setProducts] = useState([]);
  // Brug useIsFocused-hook til at tjekke, om skærmen er i fokus
  const isFocused = useIsFocused();

  // Funktion til at hente produkter fra databasen
  const fetchProducts = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "products"));
    const itemList = querySnapshot.docs.map(doc => doc.data());
    setProducts(itemList);
  };

  // Kør hentProdukter, når skærmen er i fokus
  useEffect(() => {
    if (isFocused) {
        fetchProducts();
    }
  }, [isFocused]);

  return (
    // Brug FlatList til at vise en liste af produkter
    <FlatList
      data={products}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.productContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price} DKK</Text>
          {/* Vis produktbilledet */}
          <Image 
            source={{ uri: item.imageData }}
            style={styles.productImage}
          />
          /* Tilføj en knap til at tilføje produktet til indkøbskurven */
          <Button title="Tilføj til kurv" onPress={() => addToCart(item)} />
        </View>
      )}
    />
  );
};
