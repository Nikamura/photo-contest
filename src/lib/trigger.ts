import { TriggerClient } from "@trigger.dev/sdk";
import { TRIGGER_API_URL } from "$env/static/private";

const client = new TriggerClient({
  id: "photo-contest",
  apiUrl: TRIGGER_API_URL,
});

export default client;
