<script lang="ts">
  import { upload } from "@vercel/blob/client";
  import { v4 as uuidv4 } from "uuid";
  import { invalidateAll, goto } from "$app/navigation";
  import { applyAction, deserialize } from "$app/forms";

  import type { ActionData } from "./$types";
  import type { ActionResult } from "@sveltejs/kit";

  export let form: ActionData;

  export let imageUrl: string;

  async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
    const actionUrl = event.currentTarget.action;
    const data = new FormData(event.currentTarget);

    const file = data.get("file") as File;
    const id = uuidv4();
    const pathname = `${id}/${file.name}`;

    const blob = await upload(pathname, file, {
      access: "public",
      handleUploadUrl: "/api/getUploadToken",
      clientPayload: JSON.stringify({ id, fileName: file.name }),
    });

    data.append("id", id);

    const response = await fetch(actionUrl, {
      method: "POST",
      body: data,
    });

    const result: ActionResult = deserialize(await response.text());

    if (result.type === "success") {
      await invalidateAll();
      imageUrl = blob.url;
    }

    applyAction(result);
  }
</script>

<div>Contribute</div>

<form
  method="POST"
  action="?/upload"
  enctype="multipart/form-data"
  on:submit|preventDefault={handleSubmit}
>
  <input type="file" name="file" accept="image/*" required />
  <button type="submit">Submit</button>

  {#if form}
    <p>uploaded {form.fileUpload.url}</p>
  {/if}

  {#if imageUrl}
    <img src={imageUrl} />
  {/if}
</form>
