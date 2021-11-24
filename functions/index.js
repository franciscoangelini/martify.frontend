import fetch from "node-fetch";
import functions from "firebase-functions";

export const blockfrost = functions.https.onCall(async (data, context) => {
  const apiUrl = "https://cardano-testnet.blockfrost.io/api/v0/";
  const apiKey = "testnetAWfuCqaLZ5KtOSslc8ZTZyEWj36We8h7";
  const {endpoint, headers, body} = data;

  return await apiFetcher(`${apiUrl}${endpoint}`, {
    ...headers,
    project_id: apiKey,
  }, body);
});

const apiFetcher = async (endpoint, headers, body) => {
  try {
    const response = await fetch(endpoint, {
      headers,
      method: body ? "POST" : "GET",
      body,
    });

    if (!response.ok) {
      throw response;
    }

    return response.json();
  } catch (error) {
    console.error(`Unexpected error in request. [Message: ${error.message}]`);
  }
};
