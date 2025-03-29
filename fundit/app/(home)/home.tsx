import { StyleSheet, Text, View, Button } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { app , db , auth} from "../../firebaseConfig";
import { useState } from "react";
import { router } from 'expo-router';

export default function home() {

    return (
        <View style={styles.container}>  
            <Text> Home!</Text>
            <Button
                title="gello"
                onPress={() => router.navigate("/settings")}
                />

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
