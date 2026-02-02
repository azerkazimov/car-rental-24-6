import { layoutTheme } from "@/constant/theme";
import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { StyleSheet, View } from "react-native";

export default function CarBrands() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    return (
        <View style={styles.container}>

        </View>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === "dark" ? layoutTheme.colors.primary : layoutTheme.colors.white,
    },
})