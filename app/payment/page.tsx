import { carModels } from "@/data/car-models";
import { useAddBookingStore } from "@/store/use-add-booking";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PaymentPage() {
    const { carId, startDate, endDate } = useAddBookingStore();

    const car = carModels.find((car) => car.id === carId) || null;

    if (!car) {
        return <Text>Car not found</Text>;
    }

    const totalPrice = car.pricePerDay * (new Date(endDate).getDay() - new Date(startDate).getDay());
    const totalPriceWithDiscount = totalPrice * 0.82;

    return (
        <SafeAreaView>
            <Text>Payment Page</Text>
            <Text>Selected Car: {car.brand} {car.model}</Text>
            <Text>Price: {car.pricePerDay} $</Text>
            <Text>Start Date: {startDate}</Text>
            <Text>End Date: {endDate}</Text>
            <Text>Total Price: {totalPrice} $</Text>
            <Text>Total Price with Tax: {totalPriceWithDiscount} $</Text>
        </SafeAreaView>
    )
}