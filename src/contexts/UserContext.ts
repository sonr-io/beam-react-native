import { createContext, useContext } from "react";

import { User } from "../types/User";

export type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};
export const UserContext = createContext<UserContextType>({
  user: { id: "", name: "", isOnline: true },
  setUser: () => {},
});
export const useUserContext = () => useContext(UserContext);
