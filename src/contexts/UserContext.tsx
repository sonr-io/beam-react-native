import React, { createContext, useContext } from "react";

import { User } from "../types/User";

type UserContextType = {
  user: User;
};
const UserContext = createContext({
  user: null,
}) as unknown as React.Context<UserContextType>;

export const useUserContext = () => useContext(UserContext);

type Props = { user: User };
export const UserContextProvider: React.FC<Props> = ({ user, children }) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
