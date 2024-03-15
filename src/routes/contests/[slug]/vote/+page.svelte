<script lang="ts">
  import type { PageData } from "./$types";
  import JSZip from "jszip";

  import pkg from "file-saver";
  const { saveAs } = pkg;

  export let data: PageData;

  async function addImageToZip(fileName: string, url: string, zip: JSZip) {
    const response = await fetch(url);
    const blob = await response.blob();
    zip.file(fileName, blob);
  }

  let buildingZip = false;
  async function buildZip() {
    buildingZip = true;
    const fileUrls = data.entries.map((entry) => [entry.fileName, entry.fileUrl] as const);
    const zip = new JSZip();

    for (const [fileName, url] of fileUrls) {
      if (!url) continue;
      await addImageToZip(fileName, url, zip);
    }

    buildingZip = false;

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "images.zip");
    });
  }

  import BiggerPicture from "bigger-picture/svelte";
  import "bigger-picture/css";

  import { onMount } from "svelte";

  let bp: ReturnType<typeof BiggerPicture> | null = null;
  onMount(() => {
    bp = BiggerPicture({ target: document.body });
  });
</script>

<div class="px-8">
  <div class="pb-5">
    <button class="btn btn-info {buildingZip ? 'btn-disabled' : ''}" on:click={() => buildZip()}>
      Download
    </button>
  </div>
  <div id="images">
    {#each data.entries as entry (entry.id)}
      <a
        id="image-entry-{entry.index}"
        href={entry.fileUrl}
        data-img={entry.fileUrl}
        data-thumb={entry.thumbnailUrl}
        data-alt={entry.fileName}
        data-height={entry.height}
        data-width={entry.width}
        data-caption={entry.fileName}
        on:click|preventDefault={() => {
          bp?.open({
            items: document.querySelectorAll("#images a"),
            el: document.querySelector(`#image-entry-${entry.index}`) ?? undefined,
          });
        }}
      >
        <img src={entry.thumbnailUrl} alt="Example" class="inline-block h-32 w-32 object-contain" />
      </a>
    {/each}
  </div>
</div>
