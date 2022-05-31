import { MatrixClient } from "matrix-js-sdk";
import { createContext, useContext } from "react";

type MatrixClientContextType = {
  client: MatrixClient | null;
  setClient: (client: MatrixClient | null) => void;
  members: Map<string, string>;
  setMembers: (members: Map<string, string>) => void;
};

export const MatrixClientContext = createContext<MatrixClientContextType>({
  client: null,
  setClient: () => {},
  members: new Map(),
  setMembers: () => {},
});
export const useMatrixClientContext = () => useContext(MatrixClientContext);
