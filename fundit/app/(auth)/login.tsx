import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { app , db , auth} from "../../firebaseConfig";
import { useRef, useState } from "react";
import { router } from 'expo-router';

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
            
            <TouchableOpacity style={styles.button_container} onPress={() =>{
                login();
            }}>
                <Text style={styles.button_text}> Login </Text>
            </TouchableOpacity>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F2F2F2",
    },
    input: {
        borderWidth: 1,
        borderColor: "#1DB954",
        padding: 10,
        margin: 10,
        borderRadius: 20,
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
        fontWeight:"bold",
        textAlign:"center",
        fontSize:24,
    },

});
