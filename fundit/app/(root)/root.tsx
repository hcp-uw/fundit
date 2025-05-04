import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

const screenWidth = Dimensions.get('window').width;

export default function Root() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require("../../assets/images/icon.png")} style={{ width: 300, height: 300 }} />
      </View>

      <View style={styles.waveContainer}>
        <Svg
          height={100}
          width={screenWidth}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none" // <== this makes it stretch to fill
          style={styles.wave}
        >
          <Path
            fill="#e1ece3"
            d="M0,200 C480,400 960,0 1440,200 L1440,320 L0,320 Z"
          />
        </Svg>
      </View>

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
  );
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
    overflow: 'hidden',
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
