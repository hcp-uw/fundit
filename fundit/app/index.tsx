import { Text, View,  } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View 
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/budget">
        Go to Budget screen
      </Link>
      <Link href="/stock">
        Go to stock screen
      </Link>


    </View>
  );
}
