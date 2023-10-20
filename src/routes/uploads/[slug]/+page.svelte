<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
  <h1 class="mb-3 text-2xl">{data.fileName}</h1>

  <div class="-m-2 flex flex-wrap">
    <div>
      <img src={data.thumbnailUrl} alt={data.fileName} />
      <h2>Metadata</h2>
      <pre>{JSON.stringify(data.metadata, null, 2)}</pre>
      <h2>Exif</h2>
      <pre>{JSON.stringify(data.exif, null, 2)}</pre>
      <h2>ICC</h2>
      <pre>{JSON.stringify(data.icc, null, 2)}</pre>
      <h2>IPTC</h2>
      <pre>{JSON.stringify(data.iptc, null, 2)}</pre>
      <h2>XMP</h2>
      <pre>{JSON.stringify(data.xmp, null, 2)}</pre>
    </div>
  </div>
</div>
