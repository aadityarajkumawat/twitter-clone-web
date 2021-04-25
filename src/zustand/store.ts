import create from "zustand";

type StateI = {
  showSearchResults: boolean;
  toggleShowSearchResults: (bool: boolean) => void;

  authenticated: boolean;
  setAuthenticated: (bool: boolean) => void;
};

export const useStore = create<StateI>((set) => ({
  showSearchResults: false,
  toggleShowSearchResults: (bool) => set(() => ({ showSearchResults: bool })),

  authenticated: false,
  setAuthenticated: (bool) => set(() => ({ authenticated: bool })),
}));
