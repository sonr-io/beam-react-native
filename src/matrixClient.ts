import { MATRIX_NETWORK_BASE_URL } from "@env";
import request from "xmlhttp-request";
import { createClient } from "matrix-js-sdk";

export let client = createClient({
  baseUrl: MATRIX_NETWORK_BASE_URL,
  request,
  localTimeoutMs: 5000,
});

export const setClient = (userId: string, accessToken: string) => {
  client = createClient({
    baseUrl: MATRIX_NETWORK_BASE_URL,
    request,
    localTimeoutMs: 5000,
    userId,
    accessToken,
  });
};
