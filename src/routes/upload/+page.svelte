<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

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

    await fetch(`/uploads/${id}/parse`, {
      method: "POST",
    });

    return id;
  }

  async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
    uploading = true;
    progress = 0;
    const data = new FormData(event.currentTarget);

    const files = data.getAll("files") as File[];
    numberOfUploads = files.length;

    for (const file of files) {
      await uploadFile(file);
      progress++;
    }

    goto(`/users/${$page.data.session?.user?.id}/uploads`);
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
      {/if}
    </button>
  </form>
</div>
