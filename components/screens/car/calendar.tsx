import { layoutTheme } from "@/constant/theme";
import { ThemeType } from "@/types/theme.type";
import { StyleSheet, View } from "react-native";


export default function RangeCalendar() {
    return(
        <View>
            {/* Write Calendar Component Here... */}
        </View>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        padding: 16,
        borderRadius: 28,
        backgroundColor: theme === "dark"
            ? layoutTheme.colors.background.white
            : layoutTheme.colors.background.primary,
    },
    title: {
        fontSize: 20,
        fontFamily: layoutTheme.fonts.inter.bold,
        textAlign: "center",
        color: theme === "dark"
            ? layoutTheme.colors.text.primary
            : layoutTheme.colors.text.white,
    },
    calendar: {
        borderRadius: 16,
        overflow: "hidden",
    }
})