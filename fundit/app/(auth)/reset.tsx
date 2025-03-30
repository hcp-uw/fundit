import { useState } from "react";
import { Text,View,StyleSheet,TouchableOpacity,TextInput,Alert } from "react-native";
import Svg, { Path } from "react-native-svg";
import { router } from 'expo-router';
import { auth} from "../../firebaseConfig";
import { sendPasswordResetEmail,sendEmailVerification } from "firebase/auth";

export default function reset(){
    const [email, setEmail] = useState("");

    const reset = async() =>{
        if (!email) {
            console.log("All fields are required.");
            Alert.alert("All fields are required.");
            return;
        }
        try {
            const res =  await sendPasswordResetEmail(auth, email);
            router.replace("/(root)/root");
            Alert.alert("Password reset email sent!");
            console.log("Password reset email sent!");
          } catch (error) {
            Alert.alert("Error sending reset email :(");
            console.error("Error sending reset email:", error);
          }
        


    };


    return (
        <View style ={styles.container}>
            <View style={{justifyContent:'flex-start', height:250}}>
                <Text style={styles.text}>Reset Password</Text>
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
                <TouchableOpacity style={styles.button_container} onPress={() => reset()}>
                    <Text style={styles.button_text}>Reset Password</Text>
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
  