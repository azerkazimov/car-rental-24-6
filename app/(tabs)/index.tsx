import { layoutTheme } from "@/constant/theme";
import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { router } from "expo-router";
import { FlatList, Pressable, StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const { colorScheme } = useTheme()
    console.log(colorScheme);
    const styles = getStyles(colorScheme);
    const data = [
        { id: 1, title: "Car 1", route: "/car-details" },
        { id: 2, title: "Moto", route: "/moto-details" },
        { id: 3, title: "Car 3", route: "/car-details" },
        { id: 4, title: "Car 4", route: "/car-details" },
        { id: 5, title: "Car 5", route: "/car-details" },
        { id: 6, title: "Car 6", route: "/car-details" },
        { id: 7, title: "Car 7", route: "/car-details" },
        { id: 8, title: "Car 8", route: "/car-details" },
        { id: 9, title: "Car 9", route: "/car-details" },
        { id: 10, title: "Car 10", route: "/car-details" },
    ];
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Home with Tabs Layout</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <Pressable onPress={()=> router.push(item.route as any)} style={styles.item}><Text>{item.title}</Text></Pressable>}
                horizontal
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: theme === "dark" ? "red" : "white",
    },
    list: {
        flex: 1,
        gap: 10,
        marginTop: 16,
    },
    title: {
        fontSize: 20,
        color: "green",
        textAlign: "center",
        marginTop: 16,
        fontFamily: layoutTheme.fonts.inter.bold,
    },
    item: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.3)",
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});