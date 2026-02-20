import Button from "@/components/ui/button";
import { layoutTheme } from "@/constant/theme";
import { carModels } from "@/data/car-models";
import useTheme from "@/hooks/use-theme";
import { useAddBookingStore } from "@/store/use-add-booking";
import { ThemeType } from "@/types/theme.type";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CarModelPage() {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);
    const flatListRef = useRef<FlatList>(null);

    const { id } = useLocalSearchParams();
    const { setCarId } = useAddBookingStore();



    const car = carModels.find((car) => car.id === id);
    if (!car) {
        return <Text>Car not found</Text>;
    }

    const handleBooking = () => {
        setCarId(id as string);
        router.push(`/booking`);
    }

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / SCREEN_WIDTH);
        setCurrentImage(index);
    };

    const renderImageItem = ({ item }: { item: string }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );

    const renderDots = () => (
        <View style={styles.dotsContainer}>
            {car?.images?.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        index === currentImage && styles.activeDot
                    ]}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons
                    name="chevron-back"
                    size={24}
                    color={colorScheme === "dark"
                        ? layoutTheme.colors.text.white
                        : layoutTheme.colors.text.primary} />
            </TouchableOpacity>

            <View style={styles.sliderWrapper}>
                <FlatList
                    ref={flatListRef}
                    data={car.images || []}
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
                {renderDots()}
            </View>

            <Text style={styles.title}>{car.brand} {car.model}</Text>

            <View style={styles.carDetails}>
                <Text style={styles.carDetailsTitle}>Car Info</Text>
                <View style={styles.carDetailsContainer}>
                    <View style={styles.carDetailsItem}>
                        <Ionicons
                            name="calendar-outline"
                            size={24}
                            color={colorScheme === "dark"
                                ? layoutTheme.colors.text.white
                                : layoutTheme.colors.text.primary}
                        />
                        <Text style={styles.carDetailsItemText}>{car.year}</Text>
                    </View>
                    <View style={styles.carDetailsItem}>
                        <Ionicons
                            name="battery-charging-outline"
                            size={24}
                            color={colorScheme === "dark"
                                ? layoutTheme.colors.text.white
                                : layoutTheme.colors.text.primary}
                        />
                        <Text style={styles.carDetailsItemText}>{car.fuelType}</Text>
                    </View>
                    <View style={styles.carDetailsItem}>
                        <Ionicons
                            name="cog-outline"
                            size={24}
                            color={colorScheme === "dark"
                                ? layoutTheme.colors.text.white
                                : layoutTheme.colors.text.primary}
                        />
                        <Text style={styles.carDetailsItemText}>{car.transmission}</Text>
                    </View>
                    <View style={styles.carDetailsItem}>
                        <Ionicons
                            name="car"
                            size={24}
                            color={colorScheme === "dark"
                                ? layoutTheme.colors.text.white
                                : layoutTheme.colors.text.primary}
                        />
                        <Text style={styles.carDetailsItemText}>{car.type}</Text>
                    </View>
                    <View style={styles.carDetailsItem}>
                        <Ionicons
                            name="bed-outline"
                            size={24}
                            color={colorScheme === "dark"
                                ? layoutTheme.colors.text.white
                                : layoutTheme.colors.text.primary}
                        />
                        <Text style={styles.carDetailsItemText}>Seats: {car.seats}</Text>
                    </View>
                </View>

            </View>

            <View style={styles.carFeatures}>
                {car.features.map((feature) => (
                    <View style={styles.carFeatureItem} key={feature}>
                        <Text style={styles.carFeatureItemText}>{feature}</Text>
                    </View>
                ))}
            </View>
            <Button onPress={handleBooking} style={styles.button}>
                <Text style={styles.buttonText}>Rent Now {car?.pricePerDay} $</Text>
            </Button>
        </View>
    );
}


const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === "dark" ? layoutTheme.colors.background.primary : layoutTheme.colors.background.white,
        alignItems: "center",
        paddingBottom: 32,

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 16,
        color: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
    },
    backButton: {
        position: "absolute",
        top: 60,
        left: 16,
        zIndex: 1,
    },
    sliderWrapper: {
        position: 'relative',
        width: '100%',
        height: 300,
    },
    imageContainer: {
        width: SCREEN_WIDTH,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
    },
    activeDot: {
        backgroundColor: '#E87B35',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    button: {
        marginTop: 16,
        width: "100%",
    },
    buttonText: {
        color: layoutTheme.colors.text.white,
        fontSize: 16,
        fontFamily: layoutTheme.fonts.inter.bold,
    },
    carDetails: {
        width: "100%",
        paddingHorizontal: 16,
    },
    carDetailsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",

    },
    carDetailsTitle: {
        fontFamily: layoutTheme.fonts.inter.bold,
        color: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
        fontSize: 24,
        marginBottom: 8,
    },
    carDetailsItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
        width: "45%",
    },
    carDetailsItemText: {
        fontFamily: layoutTheme.fonts.inter.bold,
        color: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
    },
    carFeatures: {
        marginTop: 32,
        width: "100%",
        paddingHorizontal: 16,
        flexDirection: "row",
        gap: 8,
    },
    carFeatureItem: {
        borderWidth: 1,
        borderColor: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
        borderRadius: 8,
        padding: 8,
        width: "33.33%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    carFeatureItemText: {
        fontFamily: layoutTheme.fonts.inter.bold,
        color: theme === "dark" ? layoutTheme.colors.text.white : layoutTheme.colors.text.primary,
        fontSize: 16,
        textAlign: "center",
    },
})