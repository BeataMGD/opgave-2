import React, { useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

import styles from '../Styling/styles';

function CheckoutScreen({ route }) {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState('');
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;
  const cartItems = route.params?.cartItems;

  if (!cartItems || cartItems.length === 0) {
    Alert.alert(
      'Warning',
      'Your cart is empty. Add products before proceeding to checkout.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
    return null;
  }

  const handleCheckout = async () => {
    try {
      const db = getFirestore();
      const reducedCartItems = cartItems.map(item => {
        const product = { name: item.name, price: item.price };
        if (item.id) product.id = item.id;
        return product;
      });

      await addDoc(collection(db, 'orders'), {
        userEmail,
        cartItems: reducedCartItems,
        orderDate: new Date(),
      });

      setName('');
      setAddress('');
      setPhone('');
      setCard('');

      Alert.alert(
        'Thank you for your order!',
        'Your payment has been processed, and your order is on its way.',
        [
          {
            text: 'OK',
            onPress: () => {
              route.params?.clearCart?.();
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error saving order: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkoutContainer}>
        <Text style={styles.orderSummary}>Order Summary:</Text>
        {cartItems.map((product, index) => (
          <View key={index} style={styles.orderItem}>
            <Text>{product.name}</Text>
            <Text>{product.price} DKK</Text>
          </View>
        ))}
        <Text style={styles.orderTotal}>
          Total: {cartItems.reduce((acc, product) => acc + product.price, 0)} DKK
        </Text>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />
        <Text>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Your address"
        />
        <Text>Phone:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Your phone number"
        />
        <Text>Card Info (Simulated):</Text>
        <TextInput
          style={styles.input}
          value={card}
          onChangeText={setCard}
          placeholder="Your card info"
        />
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CheckoutScreen;
