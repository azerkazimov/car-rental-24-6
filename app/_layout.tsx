import { Stack } from "expo-router";
import useLayoutFonts from "@/hooks/use-fonts";
import { interFont, montserratFont } from "@/constant/fonts";
import ThemeProvider from "@/context/theme-provider";
import { useEffect } from "react";
import { configureNotificationHandler, registerForPushNotifications } from "@/notification/register";
import { removeNotificationListeners, setupNotificationListeners } from "@/notification/listeners";


export default function RootLayout() {
  const { loaded, error } = useLayoutFonts({ ...interFont, ...montserratFont }) // {...interFont, ...montserratFont} is used to load the fonts

  useEffect(()=>{
    configureNotificationHandler();
    setupNotificationListeners();
    registerForPushNotifications().catch(error => {
      console.error('Error registering for push notifications:', error);
    });

    return () => {
      removeNotificationListeners();
    };
  }, [])
  
  if (!loaded || error) return null;
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home/page" />
        <Stack.Screen name="(tabs)/index" />
      </Stack>
    </ThemeProvider>
  )
}
