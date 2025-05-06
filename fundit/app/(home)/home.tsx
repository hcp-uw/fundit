import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { useRouter } from "expo-router";  // Import useRouter from expo-router
import { Ionicons } from "@expo/vector-icons";
import { StockChart } from "@/components/StockChart";
export default function home() {
    const router = useRouter();
    return (
        <View style={styles.container}>  
                <TouchableOpacity onPress={() => router.push("/settings")} style={styles.button}>
                    <Ionicons name = 'settings-sharp'style={styles.icon}/>
                </TouchableOpacity>
            <View>
                  <Text style={styles.text}>WELCOME TO FUNDIT!</Text>
            </View>
            <View>
              <StockChart symbol="AAPL" apiKey="" />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 20,
        backgroundColor: "#457e59",
    },
      button: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#e1ece3',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      },
      icon: {
        width: 24,
        height: 24,
        fontSize:24,
      },
      text:{
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 40,
        padding:20,
        color:"#e1ece3",  
        paddingTop:60,
      },
    
    

});
