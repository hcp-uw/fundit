import { Button, Text, View, } from "react-native";
import { Link } from 'expo-router';
import { useState } from "react";

export default function Budget() {

  const [hello,setHello] = useState(["hello","hi"]);



  return(
    <View>
        <Text>{hello}</Text>

      </View>


  );

}
