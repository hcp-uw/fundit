import { Stack } from "expo-router";

export default function BudgetLayout() {
  return (
    <Stack>
      <Stack.Screen name="signup" options={{ title: ""}} />
      <Stack.Screen name = "login" options={{title:""}} />
    </Stack>
  );
}
