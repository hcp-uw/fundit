import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc,} from "firebase/firestore"; 
import { db , auth} from "../../firebaseConfig";
import { useRef, useState } from "react";
import { router } from 'expo-router';
import Svg, { Path } from "react-native-svg";
import { useEffect } from "react";

export default function login() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, navigate to home
                router.replace("/(home)/home");
            } else {
                // No user is signed in, remain on the login screen
                console.log("No user is currently signed in.");
            }
        });

        // Unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const login = async() =>{
        console.log("Entering Login");
        if (!email || !password) {
            console.log("All fields are required.");
            return;
        }
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            // No need to manually store in AsyncStorage here
            console.log("User logged in successfully:", res.user);
            // The onAuthStateChanged listener will handle navigation
        } catch (err) {
            if (err instanceof Error) {
                console.log("Error:", err.message);
            } else {
                console.log("An unknown error occurred", err);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={{justifyContent:'flex-start', height:200}}>
                <Text style={styles.text}>Login</Text>
            </View>

            <View style={styles.waveContainer}>
            <Svg height={80} width="100%" viewBox="0 0 1440 320" style={styles.wave}>
                <Path
                fill="#e1ece3" 
                d="M0,200C480,400 960,0 1440,200L1440,320L0,320Z"
                />
            </Svg>
            </View>

            <View style={styles.buttonWrapper}>
                <Text style={styles.inputText}>Enter Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                />
                <Text style={styles.inputText}>Enter Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter Password"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button_container} onPress={() => login()}>
                    <Text style={styles.button_text}>Login</Text>
                </TouchableOpacity>
            </View>
  
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end", // Aligns the form and wave properly
      backgroundColor: "#457e59",
    },
    waveContainer: {
        backgroundColor: '#457e59',
        height: 100, 
      },
    wave: {
      position: "absolute",
      bottom: 0,
    },
    input: {
      borderWidth: 1,
      borderColor: "#1DB954",
      padding: 10,
      margin: 10,
      borderRadius: 20,
    },
    inputText:{
        paddingLeft: 22,
    },
    buttonWrapper: {
      backgroundColor: '#e1ece3',
      padding: 20,
    },
    button_text: {
      textAlign: "center",
      fontSize: 18,
      color: "#fff",
    },
    button_container: {
      borderRadius: 10,
      padding: 12,
      margin: 16,
      justifyContent: "center",
      backgroundColor: "#1DB954",
    },
    text: {
      fontWeight: "bold",
      textAlign: "left",
      fontSize: 70,
      padding:20,
      color:"#e1ece3",
    },
  });
  