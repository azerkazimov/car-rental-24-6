import { layoutTheme } from "@/constant/theme";
import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";


export default function RangeCalendar() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    const today = new Date().toISOString().split('T')[0];

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const onDayPress = (day: any) => {
        const selectedDate = day.dateString;

        if(selectedDate < today) return

        if (!startDate) {
            setStartDate(selectedDate);
            setEndDate(null);
            return;
        }

        if (startDate && !endDate) {
            if (selectedDate < startDate) {
                setStartDate(selectedDate);
            } else {
                setEndDate(selectedDate);
            }
            return
        }

        // Əgər start date və end date varsa, start date-i yenilə
        setStartDate(selectedDate);
        setEndDate(null);
    }

    const getMarkedDates = () => {
        if (!startDate) return {};
    
        const marked: any = {};
    
        // Ssenari 1: Yalnız başlanğıc seçilibsə
        if (startDate && !endDate) {
            marked[startDate] = {
                startingDay: true,
                endingDay: true,
                color: layoutTheme.colors.secondary,
                textColor: "white",
            };
            return marked;
        }
    
        // Ssenari 2: Hər iki tarix seçilibsə (Aralığı doldurmaq)
        if (startDate && endDate) {
            let curr = new Date(startDate);
            const last = new Date(endDate);
    
            while (curr <= last) {
                const dateString = curr.toISOString().split('T')[0];
                
                // Defolt olaraq orta günlərin stili
                marked[dateString] = {
                    color: layoutTheme.colors.secondary,
                    textColor: "white",
                };
    
                // Əgər bu gün başlanğıcdırsa
                if (dateString === startDate) {
                    marked[dateString].startingDay = true;
                }
                
                // Əgər bu gün sondursa
                if (dateString === endDate) {
                    marked[dateString].endingDay = true;
                }
    
                // Tarixi 1 gün artırırıq
                curr.setDate(curr.getDate() + 1);
            }
        }
    
        return marked; // Dövr bitdikdən sonra obyekti qaytarırıq
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Date & Time</Text>
            <Calendar
                style={styles.calendar}
                markingType="period"
                markedDates={getMarkedDates()}
                onDayPress={onDayPress}
                minDate={today}
                theme={{
                    arrowColor: layoutTheme.colors.secondary,
                    todayTextColor: layoutTheme.colors.secondary,
                    textDayFontFamily: layoutTheme.fonts.inter.regular,
                }}
            />

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