
import { View,Text,StyleSheet } from "react-native";
import { auth } from "@/firebaseConfig";
import { signOut, Auth } from "firebase/auth";
import { router } from 'expo-router';

export default function settings() {
    const logOut = (auth: Auth) =>{
        signOut(auth).then(() => {
            router.replace("/(root)/root");
        }).catch((error) => {
                console.log(error)
            });        
    }   

    return (
        <View style={styles.container}>
                <View style={{backgroundColor:"#e1ece3",borderRadius:25,alignItems:'flex-start',justifyContent:'center',marginBottom: 10}}>
                    <Text onPress={() => logOut(auth)} style={styles.text}> Sign Out </Text>
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
      text:{
        textAlign: "center",
        fontSize: 20,
        padding:20,
        color:"#232723",  
      },
    
    

});
