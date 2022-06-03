import React, { createContext, useContext, useState } from "react";

import { User } from "../types/User";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
