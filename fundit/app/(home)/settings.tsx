
import { View,Text } from "react-native";
import { auth } from "@/firebaseConfig";
import { signOut, Auth } from "firebase/auth";
import { router } from 'expo-router';

export default function settings() {
    const logOut = (auth: Auth) =>{
        signOut(auth).then(() => {
            router.navigate("/(root)/root");
        }).catch((error) => {
                console.log(error)
            });        
    }   

    return (
        <View>  
            <Text> Settings!</Text>
            <Text onPress={() => logOut(auth)}> Sign Out </Text>


        </View>
    );

}