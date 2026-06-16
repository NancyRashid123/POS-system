
import { create } from "zustand";

export const domain = "https://pos.skyready.online";

export const useCart = create((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
}));

export const useModal = create((set) => ({
  modalIndex: false,
  setModalIndex: (value) => set({ modalIndex: value }),
}));

export const useSearch = create((set) => ({
  searchValue: "",
  setSearchValue: (value) => set({ searchValue: value }),
}));