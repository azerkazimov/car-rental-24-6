import { Stack } from "expo-router";
import useLayoutFonts from "@/hooks/use-fonts";
import { interFont } from "@/constant/inter-font";

export default function RootLayout() {
  const { loaded, error } = useLayoutFonts(interFont)


  if (!loaded || error) return null;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home/page" />
      <Stack.Screen name="(tabs)/index" />
    </Stack>
    )
}
