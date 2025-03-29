import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/signup" />
    </Stack>
  );
}
