<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { applyAction, deserialize } from "$app/forms";

  import type { ActionData } from "./$types";
  import type { ActionResult } from "@sveltejs/kit";

  export let form: ActionData;

  let uploading = false;
  let progress = 0;
  let numberOfUploads = 0;

  async function uploadFile(file: File): Promise<string> {
    const resp = await fetch("/upload/getUploadUrl", {
      method: "POST",
      body: JSON.stringify({ fileName: file.name }),
    });

    const { url, id } = await resp.json();

    await fetch(url, {
      method: "PUT",
      body: file,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    });

    await fetch("/upload/parse", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    return id;
  }

  async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
    uploading = true;
    progress = 0;
    const actionUrl = event.currentTarget.action;
    const data = new FormData(event.currentTarget);

    const files = data.getAll("files") as File[];
    numberOfUploads = files.length;

    for (const file of files) {
      const id = await uploadFile(file);
      data.append("ids", id);
      progress++;
    }

    data.delete("file");
    data.delete("files");

    const response = await fetch(actionUrl, {
      method: "POST",
      body: data,
    });

    const result: ActionResult = deserialize(await response.text());

    if (result.type === "success") {
      await invalidateAll();
    }

    applyAction(result);
    uploading = false;
  }
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
  <h1 class="mb-3 text-2xl">Upload your photos</h1>

  <form
    method="POST"
    action="?/upload"
    enctype="multipart/form-data"
    on:submit|preventDefault={handleSubmit}
  >
    <div class="form-control w-full max-w-xs">
      <label class="label" for="files">
        <span class="label-text">Pick your photos</span>
      </label>
      <input
        type="file"
        name="files"
        accept="image/*"
        required
        class="file-input file-input-bordered w-full max-w-xs"
        multiple
      />
    </div>

    <button type="submit" disabled={uploading} class="btn btn-primary mt-2">
      {#if uploading}
        <span class="loading loading-xs"></span>
        Uploading {progress}/{numberOfUploads}...
      {:else}
        Upload
      {/if}</button
    >

    {#if form}
      <h2 class="mt-5 text-xl">Preview</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {#each form.urls as url}
          <div class="mb-1 sm:mr-1"><img src={url} alt="user's upload thumbnail" /></div>
        {/each}
      </div>
    {/if}
  </form>
</div>
