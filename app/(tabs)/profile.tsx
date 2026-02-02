import { layoutTheme } from "@/constant/theme";
import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { StatusBar, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { colorScheme, toggleTheme } = useTheme()
  const styles = getStyles(colorScheme)

  const handleToggleTheme = () => {
    toggleTheme(colorScheme === "dark" ? "light" : "dark")
  }

  return (
    <>
    <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
    <SafeAreaView style={styles.container}>
      <View style={styles.settings}>
        <Text style={styles.title}>Theme</Text>
        <Switch
          value={colorScheme === "dark"}
          onValueChange={handleToggleTheme}
          trackColor={{ true: "white", false: "black" }}
          thumbColor={colorScheme === "dark" ? layoutTheme.colors.secondary : layoutTheme.colors.white}
        />
      </View>
    </SafeAreaView>
    </>
  )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === "dark" ? layoutTheme.colors.primary : layoutTheme.colors.white,
  },
  header: {
    flex: 1,
  },
  settings: {
    width: "100%",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontFamily: layoutTheme.fonts.inter.bold,
    color: theme === "dark" ? "white" : "black",
  }
});