import { StyleSheet, View,} from "react-native";
import { useRouter } from "expo-router";  // Import useRouter from expo-router
import {auth} from "../firebaseConfig";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            router.navigate("/(home)/home");
        } else {
            router.navigate("/(root)/root");
        }
    });

    return () => unsubscribe();
}, []);


  return (
    <View style={styles.container}>
      {/* Empty loading area for now */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#457e59", 
  },
});

