import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false ,
      headerStyle: { backgroundColor: '#232723' },
      headerTintColor:'#e1ece3',
      }}>
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/signup" />
      <Stack.Screen name="settings" options={{ 
        headerShown: true,
        title: "Settings",

      }} /> {/* ✅ Ensure it's a stack screen */}
    </Stack>
  );
}
