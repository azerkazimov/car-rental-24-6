import { layoutTheme } from "@/constant/theme";
import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmationPage() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconWrapper}>
                    <Ionicons
                        name="checkmark-circle"
                        size={80}
                        color={layoutTheme.colors.secondary}
                    />
                </View>
                <Text style={styles.title}>Booking confirmed</Text>
                <Text style={styles.subtitle}>
                    Your payment was successful. You will receive a confirmation email shortly.
                </Text>
                <View style={styles.detailsCard}>
                    <View style={styles.detailRow}>
                        <Ionicons
                            name="calendar-outline"
                            size={20}
                            color={layoutTheme.colors.secondary}
                        />
                        <Text style={styles.detailLabel}>Reservation details</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons
                            name="card-outline"
                            size={20}
                            color={colorScheme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary}
                        />
                        <Text style={styles.detailText}>Payment completed</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace("/(tabs)")}
                    activeOpacity={0.8}
                >
                    <Ionicons name="home" size={22} color={layoutTheme.colors.white} />
                    <Text style={styles.buttonText}>Back to home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const getStyles = (theme: ThemeType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                theme === "dark"
                    ? layoutTheme.colors.background.primary
                    : layoutTheme.colors.background.white,
        },
        content: {
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 48,
            alignItems: "center",
        },
        iconWrapper: {
            marginBottom: 24,
        },
        title: {
            fontFamily: layoutTheme.fonts.inter.bold,
            fontSize: 24,
            color:
                theme === "dark"
                    ? layoutTheme.colors.text.white
                    : layoutTheme.colors.text.primary,
            textAlign: "center",
            marginBottom: 12,
        },
        subtitle: {
            fontFamily: layoutTheme.fonts.inter.regular,
            fontSize: 16,
            color:
                theme === "dark"
                    ? layoutTheme.colors.text.white
                    : layoutTheme.colors.text.primary,
            textAlign: "center",
            opacity: 0.85,
            marginBottom: 32,
            paddingHorizontal: 8,
        },
        detailsCard: {
            width: "100%",
            backgroundColor:
                theme === "dark"
                    ? layoutTheme.colors.background.darkGray
                    : layoutTheme.colors.background.gray,
            borderRadius: 12,
            padding: 20,
            marginBottom: 32,
        },
        detailRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
        },
        detailLabel: {
            fontFamily: layoutTheme.fonts.inter.semiBold,
            fontSize: 16,
            color:
                theme === "dark"
                    ? layoutTheme.colors.text.white
                    : layoutTheme.colors.text.primary,
        },
        detailText: {
            fontFamily: layoutTheme.fonts.inter.regular,
            fontSize: 15,
            color:
                theme === "dark"
                    ? layoutTheme.colors.text.white
                    : layoutTheme.colors.text.primary,
        },
        button: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            backgroundColor: layoutTheme.colors.secondary,
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 12,
            minWidth: 200,
        },
        buttonText: {
            fontFamily: layoutTheme.fonts.inter.bold,
            fontSize: 16,
            color: layoutTheme.colors.white,
        },
    });
