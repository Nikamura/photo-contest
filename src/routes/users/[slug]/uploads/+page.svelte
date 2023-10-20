<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
  <h1 class="mb-3 text-2xl">My Uploads</h1>

  <div class="-m-2 flex flex-wrap">
    {#each data.fileUploads as fileUpload (fileUpload.id)}
      <div class="w-full sm:w-1/2 lg:w-1/3">
        <a href="/uploads/{fileUpload.id}">
          <div class="card m-2 bg-base-100 shadow-xl">
            <figure class="rounded-2xl">
              <img src={fileUpload.thumbnailUrl} alt={fileUpload.fileName} />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{fileUpload.fileName}</h2>
              <!-- <p>{JSON.stringify(fileUpload.exif, null, 2)}</p> -->
              <!-- <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div> -->
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>
