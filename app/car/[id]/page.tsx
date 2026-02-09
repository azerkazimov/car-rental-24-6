import { layoutTheme } from "@/constant/theme";
import { carModels } from "@/data/car-models";
import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CarModelPage() {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);
    const flatListRef = useRef<FlatList>(null);

    const { id } = useLocalSearchParams();

    const car = carModels.find((car) => car.id === id);

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
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            
            <View style={styles.sliderWrapper}>
                <FlatList
                    ref={flatListRef}
                    data={car?.images || []}
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
                
            <Text style={styles.title}>{car?.brand} {car?.model}</Text>
        </SafeAreaView>
    );
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
})