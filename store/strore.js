import create from 'zustand';

export const useStore = create((set) => ({
  cart: {
    parrilla: [],
  },

  addParrilla: (data) =>
    set((state) => ({
      cart: {
        parrilla: [...state.cart.parrilla, data],
      },
    })),

  removeParrilla: (index) =>
    set((state) => ({
      cart: {
        parrilla: state.cart.parrilla.filter((_, i) => i != index),
      },
    })),

  resetCart: () =>
    set(() => ({
      cart: {
        parrilla: [],
      },
    })),
}));
