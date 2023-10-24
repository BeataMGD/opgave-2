import React, { useState} from 'react';
import { Button, Text, View, TextInput, ActivityIndicator,  StyleSheet, ImageBackground} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import styles from '../Styling/styles';

function LoginForm() {

    const auth = getAuth();

    //Instantiering af statevariabler, der skal benyttes i LoginForm
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    /*
    * Metoden herunder håndterer login af en eksisterende bruger ved at anvende den prædefinerede metode, som stilles til rådighed af firebase
    * signInWithEmailAndPassword tager en mail og et password med som argumenter og foretager et asynkront kald, der eksekverer login i firebase https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
    * Opstår der fejl under forsøget på login, vil der i catch blive fremsat en fejlbesked, som, ved brug af
    * setErrorMessage, angiver værdien for state-variablen, errormessage
    */
    const handleSubmit = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    }

    //Her defineres loginknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Login" />;
    };

//I return oprettes en tekstkomponent, der angiver at dette er loginfrom
//Dernæst er der to inputfelter, som løbeende sætter værdien af state-variablerne, mail og password.
// Afslutningsvis, angives det at, hvis errorMessage får fastsat en værdi, skal denne udskrives i en tekstkomponent.
    return (
        <ImageBackground
        source={require('../Styling/background.jpg')} // Provide the path to your background image
        style={styles.backgroundImage}
      >
        {/* Your existing content goes here */}
        <View>
            <Text style={styles.header}>Login</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
        </ImageBackground>
    );
}

//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default LoginForm