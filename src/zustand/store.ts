import create from "zustand";

type StateI = {
  profileImg: string;
  setProfileImg: (url: string) => void;
  editProfile: boolean;
  toggleEditProfile: (bool: boolean) => void;
  showSearchResults: boolean;
  toggleShowSearchResults: (bool: boolean) => void;
};

export const useStore = create<StateI>((set) => ({
  profileImg: "",
  setProfileImg: (url) => set(() => ({ profileImg: url })),
  editProfile: false,
  toggleEditProfile: (bool) => set(() => ({ editProfile: bool })),
  showSearchResults: false,
  toggleShowSearchResults: (bool) => set(() => ({ showSearchResults: bool })),
}));
