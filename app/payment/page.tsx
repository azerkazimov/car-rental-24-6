import LocationSection from "@/components/screens/booking/location";
import Button from "@/components/ui/button";
import Gradient from "@/components/ui/gradient";
import { layoutTheme } from "@/constant/theme";
import { carModels } from "@/data/car-models";
import useTheme from "@/hooks/use-theme";
import { useAddBookingStore } from "@/store/use-add-booking";
import { ThemeType } from "@/types/theme.type";
import { StyleSheet, Text, View } from "react-native";



export default function PaymentPage() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    const { carId, startDate, endDate } = useAddBookingStore();

    const car = carModels.find((car) => car.id === carId) || null;

    if (!car) {
        return <Text>Car not found</Text>;
    }

    const totalPrice = car.pricePerDay * (new Date(endDate).getDay() - new Date(startDate).getDay());
    const totalDays = new Date(endDate).getDay() - new Date(startDate).getDay();

    return (
        <Gradient>
            <LocationSection />
            <View style={styles.carDetails}>
                <View style={styles.carDetailsTitle}>
                    <Text style={styles.carDetailsText}> {car.brand} {car.model}</Text>
                    <Text style={styles.carDetailsText}> {car.type} - {car.seats} seats</Text>

                </View>

                <View style={styles.container}>
                    <View style={styles.bookingDetails}>
                        <Text style={styles.title}>Overview</Text>
                        <View style={styles.dayDetails}>
                            <View style={styles.dayDetailsItem}>
                                <Text style={styles.dayDetailsItemTitle}>Start: </Text>
                                <Text style={styles.dayDetailsItemValue}>{startDate}</Text>
                            </View>
                            <View style={styles.dayDetailsItem}>
                                <Text style={styles.dayDetailsItemTitle}>End: </Text>
                                <Text style={styles.dayDetailsItemValue}>{endDate}</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>Payment</Text>

                        <Text>Price: {car.pricePerDay} $</Text>
                    </View>
                    <Button onPress={() => { }} style={styles.button}>
                        <Text style={styles.buttonText}>Pay | for {totalDays} days | {totalPrice} $</Text>
                    </Button>

                </View>
            </View>
        </Gradient>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: theme === "dark"
            ? layoutTheme.colors.primary
            : layoutTheme.colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: theme === "dark"
            ? layoutTheme.colors.white
            : layoutTheme.colors.primary,
    },

    bookingDetails: {
        flex: 1,
    },


    dayDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    dayDetailsItem: {
        borderWidth: 1,
        borderColor: theme === "dark"
            ? layoutTheme.colors.lightGray
            : layoutTheme.colors.gray,
        borderRadius: 10,
        padding: 10,
        width: "48%",
        gap: 10,
    },
    dayDetailsItemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme === "dark"
            ? layoutTheme.colors.lightGray
            : layoutTheme.colors.gray,
    },
    dayDetailsItemValue: {
        fontSize: 16,
        fontWeight: "normal",
        color: theme === "dark"
            ? layoutTheme.colors.white
            : layoutTheme.colors.primary,
    },



    carDetails: {
        position: "absolute",
        top: "44%",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: layoutTheme.colors.secondary,

        borderRadius: 30,

        marginTop: -100,
    },
    carDetailsTitle: {
        padding: 20,
        gap: 10,
    },
    carDetailsText: {

        fontFamily: layoutTheme.fonts.inter.semiBold,
        fontSize: 18,
        color: layoutTheme.colors.white,
    },

    button: {
        position: "absolute",
        bottom: 40,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: layoutTheme.colors.white,
    }
})