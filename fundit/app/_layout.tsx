import { Stack,  } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth Stack */}
      <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />

      {/* Main App with Tabs */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
