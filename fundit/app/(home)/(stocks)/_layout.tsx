import { Stack } from "expo-router";

export default function StocksLayout() {
  return (
    <Stack>
      <Stack.Screen name="signup" options={{ title: ""}} />
      <Stack.Screen name = "login" options={{title:""}} />
    </Stack>
  );
}
