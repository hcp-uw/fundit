import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { app , db , auth} from "../../firebaseConfig";
import { useRef, useState } from "react";
import { router } from 'expo-router';
import Svg, { Path } from "react-native-svg";

export default function login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    // const auth = getAuth(app);
    async function login() {
        console.log("Entering Login")
        if (!email || !password) {
            console.log("All fields are required.");
            return;
        }
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            // Store user info in Firestore

            const userRef  = await getDoc(doc(db,"Users",res.user.uid));
            console.log(useRef)
            if (userRef.exists()) {
                console.log("Document data:", userRef.data());
                router.navigate("/(home)/home");
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
            
            console.log("User stored in Firestore");
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
            {/* Wave container */}
            <View style={styles.waveContainer}>
            <Svg height={80} width="100%" viewBox="0 0 1440 320" style={styles.wave}>
                <Path
                fill="#e1ece3" // Matches background color to blend
                d="M0,200C480,400 960,0 1440,200L1440,320L0,320Z"
                />
            </Svg>
            </View>

        {/* Main content wrapper */}
            <View style={styles.buttonWrapper}>
                <Text style={styles.text}>Login</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                />
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
      textAlign: "center",
      fontSize: 24,
    },
  });
  