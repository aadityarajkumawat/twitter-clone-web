import create from "zustand";

type StateI = {
  profileImg: string;
  setProfileImg: (url: string) => void;
  editProfile: boolean;
  toggleEditProfile: (bool: boolean) => void;
  showSearchResults: boolean;
  toggleShowSearchResults: (bool: boolean) => void;

  authenticated: boolean;
  setAuthenticated: (bool: boolean) => void;

  curr: number | undefined;
  setCurr: (curr: number) => void;
};

export const useStore = create<StateI>((set) => ({
  profileImg: "",
  setProfileImg: (url) => set(() => ({ profileImg: url })),
  editProfile: false,
  toggleEditProfile: (bool) => set(() => ({ editProfile: bool })),
  showSearchResults: false,
  toggleShowSearchResults: (bool) => set(() => ({ showSearchResults: bool })),

  authenticated: false,
  setAuthenticated: (bool) => set(() => ({ authenticated: bool })),

  curr: undefined,
  setCurr: (curr) => set(() => ({ curr })),
}));
