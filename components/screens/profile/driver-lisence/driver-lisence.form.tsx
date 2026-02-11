import { StyleSheet, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { driverLicenseSchema, DriverLicenseSchemaType } from "./driver-license.schema";
import { ThemeType } from "@/types/theme.type";
import { layoutTheme } from "@/constant/theme";
import useTheme from "@/hooks/use-theme";

export default function DriverLisenceForm() {
    const { colorScheme } = useTheme()
    const styles = getStyles(colorScheme)

    const { control, handleSubmit, formState: { errors } } = useForm<DriverLicenseSchemaType>({
        resolver: zodResolver(driverLicenseSchema),
        defaultValues: {
            driverLicenseNumber: "",
            driverLicenseExpiryDate: "",
            driverLicenseImage: "",
        }
    })


    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Controller
                    name="driverLicenseNumber"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.formControlWrapper}>
                            <TextInput
                                style={styles.formControl}
                                placeholder="Driver License Number"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        </View>
                    )}
                />
                <Controller
                    name="driverLicenseExpiryDate"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.formControlWrapper}>
                            <TextInput
                                style={styles.formControl}
                                placeholder="Driver License Expiry Date"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        </View>
                    )}
                />
            </View>

        </View>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === "dark"
            ? layoutTheme.colors.background.primary
            : layoutTheme.colors.background.white,
            marginTop: 24,
    },
    form: {
        flex: 1,
        gap: 16,
    },
    formControlWrapper: {
        width: "100%",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: layoutTheme.colors.gray,
        borderRadius: 10,
        padding: 16,
    },
    formControl: {
        fontSize: 14,
        color: layoutTheme.colors.text.secondary,
    }
})

