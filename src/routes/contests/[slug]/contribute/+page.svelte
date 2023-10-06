<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { applyAction, deserialize } from "$app/forms";
  import { Image } from "image-js";

  import type { ActionData } from "./$types";
  import type { ActionResult } from "@sveltejs/kit";

  export let form: ActionData;

  async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
    const actionUrl = event.currentTarget.action;
    const data = new FormData(event.currentTarget);

    const file = data.get("file") as File;

    const resp = await fetch("/api/getUploadUrl", {
      method: "POST",
      body: JSON.stringify({ fileName: file.name }),
    });

    const { url, id, thumbnailUrl } = await resp.json();

    await fetch(url, {
      method: "PUT",
      body: file,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    });

    await fetch("/api/generateThumbnail", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    // const image = await Image.load(await file.arrayBuffer());
    // // TODO: vertical photos seems to get rotated 90 degrees in the thumbnail
    // const thumbnailFile = image.resize({ width: 1000 }).toBuffer();

    // await fetch(thumbnailUrl, {
    //   method: "PUT",
    //   body: thumbnailFile,
    // }).then((response) => {
    //   if (!response.ok) {
    //     throw new Error(`${response.status}: ${response.statusText}`);
    //   }
    // });

    data.append("id", id);
    data.delete("file");

    const response = await fetch(actionUrl, {
      method: "POST",
      body: data,
    });

    const result: ActionResult = deserialize(await response.text());

    if (result.type === "success") {
      await invalidateAll();
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
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={form.url} />
  {/if}
</form>
