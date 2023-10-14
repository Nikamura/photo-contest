<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
  <h1 class="mb-3 text-2xl">My Uploads</h1>
  <div class="grid sm:grid-cols-2 md:grid-cols-3">
    {#each data.fileUploads as fileUpload}
      <div>
        <img src={fileUpload.thumbnailUrl} loading="lazy" class="h-48 w-96 object-contain" alt="" />
      </div>
    {/each}
  </div>
</div>
