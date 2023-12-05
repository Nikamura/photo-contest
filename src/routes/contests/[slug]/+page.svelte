<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  let selectedPhotos: string[] = data.selectedPhotos;
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
  <h1 class="mb-3 text-2xl">{data.contest.name}</h1>

  <div class="flex flex-wrap">
    <ul class="steps steps-vertical sm:steps-horizontal">
      <li class="step step-primary">Take photos <br class="hidden sm:grid" />(09/01 - 12/01)</li>
      <li class="step step-primary">
        Upload photos <br class="hidden sm:grid" />(12/01 - 12/25)
      </li>
      <li class="step">Rate photos <br class="hidden sm:grid" />(12/25 - 12/30)</li>
      <li class="step">Reveal the winner <br class="hidden sm:grid" />(12/30)</li>
    </ul>
  </div>
</div>

<form method="POST" action="?/saveSelectedPhotos">
  <div class="mx-auto max-w-7xl px-6 py-10">
    <h1 class="mb-3 mt-5 text-2xl">Select your photos</h1>
    <div class="mt-5">
      <select
        multiple
        class="w-full bg-transparent"
        bind:value={selectedPhotos}
        name="selectedPhotos"
      >
        {#each data.fileUploads as fileUpload (fileUpload.id)}
          <option value={fileUpload.id} class="flex flex-wrap">
            <img src={fileUpload.thumbnailUrl} alt="" class="h-32 w-32 object-cover" />
            <h1 class="ml-1 text-lg">{fileUpload.fileName}</h1>
          </option>
        {/each}
      </select>
    </div>
  </div>

  {#if selectedPhotos.length > 0}
    <div class="mx-auto max-w-7xl px-6 py-10">
      <h1 class="mb-3 text-2xl">Your photos</h1>
      <div class="flex flex-wrap">
        {#each selectedPhotos as selectedPhoto}
          <div class="w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
            <img
              src={data.fileUploads.find((fileUpload) => fileUpload.id === selectedPhoto)
                ?.thumbnailUrl}
              alt=""
              class="h-32 w-full object-cover"
            />
          </div>
        {/each}
      </div>
      <button class="btn mt-1">Save</button>
    </div>
  {/if}
</form>
