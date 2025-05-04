import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";
import { useEffect } from "react";
import type { User } from "firebase/auth/react-native"; 

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {  
      if (user) {
        router.replace("/(home)/home");
      } else {
        router.replace("/(root)/root");
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
