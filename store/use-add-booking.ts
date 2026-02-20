import { create } from "zustand";

interface AddBookingState {
    startDate: string;
    endDate: string;
    carId: string;
    setStartDate: (startDate: string) => void;
    setEndDate: (endDate: string) => void;
    setCarId: (carId: string) => void;
}

export const useAddBookingStore = create<AddBookingState>((set) => ({
    startDate: "",
    endDate: "",
    carId: "",
    setStartDate: (startDate: string) => set({ startDate }),
    setEndDate: (endDate: string) => set({ endDate }),
    setCarId: (carId: string) => set({ carId }),
}));