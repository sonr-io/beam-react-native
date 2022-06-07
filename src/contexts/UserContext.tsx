import React, { createContext, useContext } from "react";

import { User } from "../types/User";

type UserContextType = { user: User };
const UserContext = createContext<UserContextType>({
  user: {
    id: "",
    name: "",
    isOnline: false,
  },
});

export const useUserContext = () => useContext(UserContext);

type Props = { user: User };
export const UserContextProvider: React.FC<Props> = ({ user, children }) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
