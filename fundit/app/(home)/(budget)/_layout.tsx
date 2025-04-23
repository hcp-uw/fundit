import { Stack } from "expo-router";

export default function BudgetLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#457e59' },
      }}

    >
      <Stack.Screen name="budget" />
      {/* <Stack.Screen name = "login" options={{title:""}} /> */}
    </Stack>
  );
}
