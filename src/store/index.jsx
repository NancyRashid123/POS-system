import { create } from "zustand";

 export const domain = "https://pos.skyready.online";
export const useCart = create((set) => ({
    cart: [],
    setCart: (newValue) => set(() => ({ cart: newValue })),
})); ;

export const useModal = create((set) => ({
    modalIndex: false,
    setModalIndex: (newValue) => set(() => ({ modalIndex: newValue })),
})); ;

export const useSearch = create((set) => ({
    searchValue: "",
    setSearchValue: (newValue) => set(() => ({ searchValue: newValue })),
})); ;