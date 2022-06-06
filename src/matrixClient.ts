import { MATRIX_NETWORK_BASE_URL } from "@env";
import request from "xmlhttp-request";
import { createClient } from "matrix-js-sdk";

export const client = createClient({
  baseUrl: MATRIX_NETWORK_BASE_URL,
  request,
  localTimeoutMs: 5000,
});
