import { MatrixClient } from "matrix-js-sdk";
import { createContext, useContext } from "react";

type MatrixClientContextType = {
  client: MatrixClient | null;
  setClient: (client: MatrixClient | null) => void;
};

export const MatrixClientContext = createContext<MatrixClientContextType>({
  client: null,
  setClient: () => {},
});
export const useMatrixClientContext = () => useContext(MatrixClientContext);
