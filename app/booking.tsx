import RangeCalendar from "@/components/screens/car/calendar";
import Button from "@/components/ui/button";
import { layoutTheme } from "@/constant/theme";
import { carModels } from "@/data/car-models";
import useTheme from "@/hooks/use-theme";
import { useAddBookingStore } from "@/store/use-add-booking";
import { ThemeType } from "@/types/theme.type";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Booking() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    const { carId } = useAddBookingStore();

    const car = carModels.find((car) => car.id === carId) || null;

    if (!car) {
        return <Text>Car not found</Text>;
    }

    const handleBooking = () => {
        router.push(`/payment/page`);
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color={colorScheme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>Date & Time</Text>
            </View>
            <View style={styles.bookedCarContainer}>
                <Text style={styles.bookedCarTitle}> Selected Car: {car.brand} {car.model}</Text>
            </View>
            <RangeCalendar  />
            <Button onPress={handleBooking} style={styles.button}>
                <Text style={styles.buttonText}>Book Now</Text>
            </Button>
        </View>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === "dark" ? layoutTheme.colors.background.primary : layoutTheme.colors.background.white,
    },
    header: {
        marginTop: 80,
        paddingHorizontal: 22,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: layoutTheme.fonts.inter.bold,
        color: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
        fontSize: 24,
        marginBottom: 8,
    },
    bookedCarContainer: {
        paddingHorizontal: 22,
        marginBottom: 16,
        marginTop: 22,
    },
    bookedCarTitle: {
        fontFamily: layoutTheme.fonts.inter.bold,
        color: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
        fontSize: 14,
        marginBottom: 8,
    },
    button: {
        marginHorizontal: "auto",
        marginBottom: 44,
    },
    buttonText: {
        fontFamily: layoutTheme.fonts.inter.bold,
        color: layoutTheme.colors.white,
        fontSize: 16,
        textAlign: "center",
    },
});