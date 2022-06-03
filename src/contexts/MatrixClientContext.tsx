import { MatrixClient } from "matrix-js-sdk";
import React, { createContext, useContext, useState } from "react";

type MatrixClientContextType = {
  client: MatrixClient | null;
  setClient: (client: MatrixClient | null) => void;
};

const MatrixClientContext = createContext<MatrixClientContextType>({
  client: null,
  setClient: () => {},
});
export const useMatrixClientContext = () => useContext(MatrixClientContext);

export const MatrixClientContextProvider: React.FC = ({ children }) => {
  const [client, setClient] = useState<MatrixClient | null>(null);

  return (
    <MatrixClientContext.Provider value={{ client, setClient }}>
      {children}
    </MatrixClientContext.Provider>
  );
};
