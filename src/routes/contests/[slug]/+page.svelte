<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  let selectedPhotos: string[] = data.selectedPhotos;
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
  <h1 class="mb-3 text-2xl">{data.contest.name}</h1>

  <div class="flex flex-wrap">
    <ul class="steps steps-vertical sm:steps-horizontal">
      <li class="step step-primary">Take photos</li>
      <li class="step step-primary">Upload photos</li>
      <li class="step {data.contest.contestStatus != 'ACCEPTING_ENTRIES' ? 'step-primary' : ''}">
        Rate photos
      </li>
      <li class="step {data.contest.contestStatus === 'FINISHED' ? 'step-primary' : ''}">
        Reveal the winner
      </li>
    </ul>
  </div>
</div>

{#if data.contest.contestStatus === "VOTING"}
  <div class="pl-6">
    <a href="/contests/{data.contest.id}/vote" class="btn btn-secondary btn-lg btn-wide"
      >VOTE NOW
    </a>
  </div>
{/if}

<form method="POST" action="?/saveSelectedPhotos">
  {#if data.contest.contestStatus === "ACCEPTING_ENTRIES"}
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
  {/if}

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

      {#if data.contest.contestStatus === "ACCEPTING_ENTRIES"}
        <button class="btn mt-1">Save</button>
      {/if}
    </div>
  {/if}
</form>
