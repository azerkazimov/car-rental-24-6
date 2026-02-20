import { create } from "zustand";

interface Card {
    id: string;
    cardNumber: string;
    cardHolderName: string;
    cardExpirationDate: string;
    cardCvv: string;
}

interface AddCardState {
    cardNumber: string;
    cardHolderName: string;
    cardExpirationDate: string;
    cardCvv: string;
    cards: Card[];
    addCard: (card: Card) => void;
    setCardNumber: (cardNumber: string) => void;
    setCardHolderName: (cardHolderName: string) => void;
    setCardExpirationDate: (cardExpirationDate: string) => void;
    setCardCvv: (cardCvv: string) => void;
}


export const useAddCardStore = create<AddCardState>((set) => ({
    cards: [],
    cardNumber: "",
    cardHolderName: "",
    cardExpirationDate: "",
    cardCvv: "",
    addCard: (card: Card) => set((state) => ({ cards: [...state.cards, card] })),
    setCardNumber: (cardNumber: string) => set({ cardNumber }),
    setCardHolderName: (cardHolderName: string) => set({ cardHolderName }),
    setCardExpirationDate: (cardExpirationDate: string) => set({ cardExpirationDate }),
    setCardCvv: (cardCvv: string) => set({ cardCvv }),
}))