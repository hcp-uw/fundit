import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth Stack */}
      <Stack.Screen name="(home)" />




      {/* Main App with Tabs */}
    </Stack>
          // <Tabs
          // screenOptions={{
          //     tabBarActiveTintColor: '#black',
          //     headerStyle: {
          //     backgroundColor: '#f0f3f7',
          //     },
          //     headerShadowVisible: false,
          //     tabBarStyle: {
          //     backgroundColor: '#f0f3f7',
          //     },
          // }}
          // >
          //     <Tabs.Screen name="index" options={{
          //         title:'Home',
          //         tabBarIcon: ({ color, focused }) => (
          //             <Ionicons name={focused ? 'calculator-sharp' : 'calculator-outline'} color={color} size={24} />
          //         ),
      
          //     }} />
          // </Tabs>
      
  );
}
