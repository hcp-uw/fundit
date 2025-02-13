import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { app , db , auth} from "../../firebaseConfig";
import { useState } from "react";
import { router } from 'expo-router';

export default function signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    // const auth = getAuth(app);
    async function signUp() {
        if (!email || !password || !username) {
            console.log("All fields are required.");
            return;
        }
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created:", res.user.uid);

            // Store user info in Firestore

            await setDoc(doc(db,"Users",res.user.uid), {
                uid: res.user.uid,
                username: username,
                email: email,
                createdAt: new Date().toISOString()
            });
            router.back();

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
            <Text style={styles.text}>Sign Up!</Text>
            <TextInput 
                style={styles.input}
                value={username} 
                onChangeText={setUsername} 
                placeholder="Enter Username"
            />
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
                signUp();
            }}>
                <Text style={styles.button_text}> Sign Up </Text>
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
