import { ClientEvent, createClient, MatrixClient } from "matrix-js-sdk";
import request from "xmlhttp-request";

export const login = async (user: string, password: string) => {
  const response = await fetch(
    "https://matrix.sonr.network/_matrix/client/r0/login",
    {
      method: "POST",
      body: JSON.stringify({
        type: "m.login.password",
        user,
        password,
      }),
    }
  );
  const { user_id: userId, access_token: accessToken } = await response.json();

  if (!userId || !accessToken) {
    throw new Error("login failed");
  }

  const client = createClient({
    baseUrl: "https://matrix.sonr.network",
    request,
    userId,
    accessToken,
    localTimeoutMs: 5000,
  });
  const result = new Promise<MatrixClient>((resolve) => {
    client.on(ClientEvent.Sync, (state) => {
      if (state === "PREPARED") {
        resolve(client);
      }
    });
  });
  await client.startClient();

  return result;
};
