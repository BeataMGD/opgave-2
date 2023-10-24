import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../Styling/styles';
import ItemList from '../Items/ItemList';

function ProfileScreen() {
  // Initialiser Firebase Authentication og Navigation hooks
  const auth = getAuth();
  const navigation = useNavigation();

  // State til at styre modalens synlighed og brugerens email
  const [modalVisible, setModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  // State til at holde produkter i indkøbskurven
  const [cart, setCart] = useState([]);

  // Opdater brugerens email, når skærmen bliver vist
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, [auth]);

  // Funktion til at tilføje et produkt til indkøbskurven
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Beregner totalprisen for produkter i indkøbskurven
  const calculateTotal = () => {
    return cart.reduce((acc, product) => acc + product.price, 0);
  };

  // Funktion til at logge brugeren ud
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error("Fejl ved logud: ", error);
    }
  };

  // Funktion til at slette brugerens konto
  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error("Fejl ved sletning af konto: ", error);
    }
  };

  // Funktion til at tømme indkøbskurven
  const clearCart = () => {
    setCart([]);
  };

  // Funktion til at navigere til checkout, hvis der er produkter i kurven
  const navigateToCheckout = () => {
    if (cart.length === 0) {
        Alert.alert("Indkøbskurv tom", "Tilføj nogle produkter til din indkøbskurv først.");
        return;
    }
    navigation.navigate('Checkout', { cartItems: cart, clearCart: clearCart });
  };

  // Render komponenten
  return (

  <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ItemList addToCart={addToCart} />
        <TouchableOpacity style={styles.menuIcon} onPress={() => setModalVisible(true)}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Viser indholdet af indkøbskurven og den samlede pris */}
      <View>
        <Text>Indkøbskurv:</Text>
        {cart.map((product, index) => (
          <Text key={index}>{product.name} - {product.price} DKK</Text>
        ))}
        <Button title="Checkout" onPress={navigateToCheckout} />
        <Text>Total: {calculateTotal()} DKK</Text>
      </View>

      {/* Modal til at vise brugerindstillinger */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalItem} onPress={handleSignOut}>
              <Text style={styles.modalItemText}>Log ud</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={handleDeleteAccount}>
              <Text style={[styles.modalItemText, styles.deleteText]}>Slet konto</Text>
            </TouchableOpacity>
            {/* Andre indstillinger kan tilføjes her */}
            {userEmail && (
              <View style={styles.emailContainer}>
                <Text style={styles.emailText}>Brugerens e-mail: {userEmail}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.closeButtonText}>Luk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>


  );
}

export default ProfileScreen;
