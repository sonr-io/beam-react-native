import { createContext, useContext } from "react";

import { User } from "../types/User";

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
export const useUserContext = () => useContext(UserContext);
