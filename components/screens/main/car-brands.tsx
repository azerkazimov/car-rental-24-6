import { layoutTheme } from "@/constant/theme";
import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { carModels } from "@/data/car-models";
import { Image } from "expo-image";
import { router } from "expo-router";
import { CarModel } from "@/types/car-model.types";

export default function CarBrands() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Available Near You</Text>
                <TouchableOpacity onPress={() => router.push("/car-list")}>
                    <Text style={styles.viewAllButtonText}>See All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={carModels as CarModel[]}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.item}>
                        <Image source={{ uri: item.image }} style={styles.brandImage} />
                        <Text style={styles.brandName}>{item.brand}</Text>
                        <Text style={styles.modelName}>{item.model}</Text>
                        <View>
                            <Text style={styles.modelYear}>{item.year}</Text>
                            <Text style={styles.modelPrice}>{item.pricePerDay}</Text>
                        </View>
                    </TouchableOpacity>}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </View>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === "dark" ? layoutTheme.colors.primary : layoutTheme.colors.white,
    },
    list: {
        gap: 10,
        marginTop: 16,
    },
    item: {
    },
    brandImage: {
    },
    brandName: {},
    modelName: {},
    modelYear: {},
    modelPrice: {},
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontFamily: layoutTheme.fonts.inter.bold,
        fontSize: 22,
        color: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
    },
    viewAllButtonText: {
        fontFamily: layoutTheme.fonts.inter.regular,
        color: layoutTheme.colors.text.secondary,
    },
})