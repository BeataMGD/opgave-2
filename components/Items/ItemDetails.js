// ItemDetails.js
import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ItemDetails = ({ cart, setCart }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;

  const addToCart = () => {
    // Add item to the cart with the price
    setCart([...cart, { ...item, quantity: 1 }]);
    navigation.navigate('ShoppingCart');
  };

  return (
    <View>
      <Text>Item Details</Text>
      <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
};

export default ItemDetails;
