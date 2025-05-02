import { StyleSheet, Text, View, TouchableOpacity, TextInput,Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from "../../firebaseConfig";
import { useState } from "react";
import { router } from 'expo-router';
import Svg, { Path } from "react-native-svg";
import { useEffect } from "react";

export default function login() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace("/(home)/home");
            } else {
                console.log("No user is currently signed in.");
            }
        });
    
        return () => unsubscribe();
    }, []);
    

    const login = async () => {
        console.log("Entering Login");
        if (!email || !password) {
            console.log("All fields are required.");
            Alert.alert("All fields are required.");
            return;
        }
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            await res.user.reload(); // Refresh user data to get latest email verification status
    
            if (res.user.emailVerified) {
                console.log("User logged in successfully:", res.user);
                router.replace("/(home)/home");
            } else {
                console.log("Email not verified. Please verify your email.");
                Alert.alert("Email not verified", "Please check your inbox and verify your email before logging in.");
                router.replace("/(root)/root");
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log("Error:", err.message);
                Alert.alert("Login failed", err.message);
            } else {
                console.log("An unknown error occurred", err);
                Alert.alert("Login failed", "An unknown error occurred. Please try again.");
            }
        }
    };
    
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
                <TouchableOpacity onPress = {() => router.replace("/(auth)/reset")}>
                    <Text style={styles.inputText}>Forgot Password?</Text>
                </TouchableOpacity>
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
  