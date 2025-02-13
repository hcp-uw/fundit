import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { useRouter , } from "expo-router";  // Import useRouter from expo-router

export default function Index() {
  const router = useRouter();  // Initialize router for navigation


  return (
    <View style={styles.container}>  
      <Text style={styles.text}>Index!</Text>

      <TouchableOpacity style={styles.button_container} onPress={() =>{router.push("/(auth)/signup");}}>
        <Text style={styles.button_text}>SignUp</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.button_container} onPress={() =>{router.push("/(auth)/login");}}>
        <Text style={styles.button_text}>Login</Text>
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
