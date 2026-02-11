import { z } from "zod"

export const driverLicenseSchema = z.object({
    driverLicenseNumber: z.string().min(1, { message: "Driver license number is required" }),
    driverLicenseExpiryDate: z.string().min(1, { message: "Driver license expiry date is required" }),
    driverLicenseImage: z.string().min(1, { message: "Driver license image is required" }),
})

export type DriverLicenseSchemaType = z.infer<typeof driverLicenseSchema>