import { layoutTheme } from "@/constant/theme";
import { carModels } from "@/data/car-models";
import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarModelPage() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);
    // const [car, setCar] = useState<CarModel | null>(null);
    // useEffect(() => {
    //     const car = fetch(`https://api.example.com/cars/${id}`).then((res) => res.json());
    //     setCar(car);
    // },[])

    const { id } = useLocalSearchParams(); // useParams from React 
    console.log(id);


    const car = carModels.find((car) => car.id === id);
    return (
        <SafeAreaView style={styles.container}>
           
           <Image source={{ uri: car?.image }} style={{ width: "100%", height: 300 }} />
           <Text style={styles.title}>{car?.brand} {car?.model}</Text>
        </SafeAreaView>
    )


}


const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === "dark" ? layoutTheme.colors.background.primary : layoutTheme.colors.background.white,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 16,
        color: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
    }
})