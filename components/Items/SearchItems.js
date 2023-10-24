import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import styles from '../Styling/styles';


function SearchItems() {
  // Opretter lokal state for søgeterm og produkter
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  // Funktion til at søge efter produkter baseret på søgeterm
  const searchProducts = async () => {
    try {
      const db = getFirestore(); // Initialiserer Firestore-databasen
      const query = query(collection(db, 'products'), where('name', '==', searchTerm)); // Opretter en forespørgsel for produkter med matchende navn
      const querySnapshot = await getDocs(query); // Udfører forespørgslen og henter resultatet
      const productList = querySnapshot.docs.map(doc => doc.data()); // Konverterer resultatet til en liste af produkter

      if (productList.length === 0) {
        console.log("Ingen produkter fundet for søgetermen:", searchTerm);
      } else {
        console.log("Produkter fundet:", productList);
      }

      setProducts(productList); // Opdaterer state med de fundne produkter
    } catch (error) {
      console.error("Fejl ved søgning efter produkter:", error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Søg efter et produkt"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        style={styles.searchInput}
      />
      <TouchableOpacity style={styles.searchButton} onPress={searchProducts}>
        <Text style={styles.searchButtonText}>Søg</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
      />
    </View>
  );
}

function ProductCard({ product }) {
  return (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{product.name} - {product.price} DKK</Text>
      <Image 
        source={{ uri: product.imageURL }}
        style={styles.productImage}
      />
    </View>
  );
}

export default SearchItems;
