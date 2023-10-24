import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Import your components
import ProfileScreen from './components/Profile/ProfileScreen';
import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import SearchItems from './components/Items/SearchItems';
import ShoppingCart from './components/Cart/ShoppingCart';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7jX9A5DEty0lrVubHc4gF9hEDn2qJRcQ",
  authDomain: "react-3830e.firebaseapp.com",
  databaseURL: "https://react-3830e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-3830e",
  storageBucket: "react-3830e.appspot.com",
  messagingSenderId: "451100656853",
  appId: "1:451100656853:web:c1cd6febf103b431d60e5c"
};

// Initialiser Firebase med den givne konfiguration
initializeApp(firebaseConfig);


// Opret en Tab Navigator
const Tab = createBottomTabNavigator();

function App() {
  // State til at holde den aktuelle bruger og rolle
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Få adgang til Firebase Auth service
  const auth = getAuth();

  // Effekt til at lytte efter ændringer i brugerens autentificeringstilstand
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        // Hent brugerens rolle fra Firestore
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', authUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setRole(null);
      }
    });

    // Afbryd lytteren, når komponenten afmonteres
    return () => unsubscribe();
  }, []);

  // Funktion til at generere navigationsskærme afhængigt af brugerens rolle og autentificering
  const generateScreens = () => {
    if (user) {
      // Bruger er logget ind
      const screens = [
        <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{
          tabBarIcon: () => (<Ionicons name="person" size={20} />),
          headerShown: null
        }}/>,

        <Tab.Screen name="Search Items" component={SearchItems} 
        options={{
          tabBarIcon: () => (<Ionicons name="search" size={20}/>),
          headerShown: null
        }}/>,

        <Tab.Screen name="Shopping Cart" component={ShoppingCart} 
        options={{
              tabBarIcon: () => (<Ionicons name="cart" size={20} />),
        }}/>,
      ];
      return screens;
    } else {
      // Bruger er ikke logget ind
      return [
        <Tab.Screen name="Sign Up" component={SignUpForm} 
        options={{
          tabBarIcon: () => (<Ionicons name="ios-create" size={20} />),
        }}/>,
        <Tab.Screen name="Login" component={LoginForm} 
        options={{
          tabBarIcon: () => (<Ionicons name="ios-log-in" size={20} />)
        }}/>,
      ];
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {generateScreens()}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
