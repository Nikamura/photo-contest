<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <h1>File Uploads</h1>
  <main>
    <div>
      {#each data.fileUploads as fileUpload (fileUpload.id)}
        <div class="file-upload">
          <h2>{fileUpload.fileName}</h2>
          {#if fileUpload.thumbnailUrl}
            <a href={fileUpload.fileUrl} target="_blank" rel="noopener noreferrer">
              <img src={fileUpload.thumbnailUrl} alt={fileUpload.fileName} />
            </a>
          {/if}
        </div>
      {/each}
    </div>
  </main>
</div>

<style lang="postcss">
  div {
    color: inherit;
    padding: 2rem;
  }
</style>
