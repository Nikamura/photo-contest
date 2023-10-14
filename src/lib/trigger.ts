import { TriggerClient } from "@trigger.dev/sdk";
import { TRIGGER_API_KEY } from "$env/static/private";

const client = new TriggerClient({
  id: "photo-contest",
  apiKey: TRIGGER_API_KEY,
});

export default client;
