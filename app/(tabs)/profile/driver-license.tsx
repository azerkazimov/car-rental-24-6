
import { layoutTheme } from "@/constant/theme";
import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import DriverLisenceForm from "@/components/screens/profile/driver-lisence/driver-lisence.form";

export default function DriverLicense() {
    const { colorScheme } = useTheme()
    const styles = getStyles(colorScheme)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/profile")}>
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={colorScheme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Driver License</Text>
            </View>
            
            <DriverLisenceForm />
        </SafeAreaView>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === "dark"
            ? layoutTheme.colors.background.primary
            : layoutTheme.colors.background.white,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.inter.bold,
        color: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
    }
})