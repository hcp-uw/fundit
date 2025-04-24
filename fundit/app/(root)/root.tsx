import { StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";
import { useRouter } from "expo-router";  // Import useRouter from expo-router
import Svg, { Path } from "react-native-svg";

export default function Root() {
    const router = useRouter();  // Initialize router for navigation
    return(
        <View style={styles.container}>
        {/* Background section with wave */}
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Image source={require("../../assets/images/icon.png")} style={{width:300,height:300}}/>
        </View>
        <View style={styles.waveContainer}>
          <Svg height={80} width="100%" viewBox="0 0 1440 320" style={styles.wave}>
            <Path
              fill="#e1ece3" // Matches background color to blend
              d="M0,200C480,400 960,0 1440,200L1440,320L0,320Z"
              />
          </Svg>
        </View>
  
        {/* Buttons Section */}
        <View style={styles.buttonWrapper}>
  
          <TouchableOpacity 
            style={styles.button_container} 
            onPress={() => { router.push("/(auth)/signup"); }}
          >
            <Text style={styles.button_text}>Sign Up</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            style={styles.button_container} 
            onPress={() => { router.push("/(auth)/login"); }}
          >
            <Text style={styles.button_text}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
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
  });
  
  