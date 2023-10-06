<script>
  import { enhance } from "$app/forms";

  export let form;
</script>

<div>Contribute</div>

<form use:enhance action="?/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="files" accept="image/*" multiple required />
  <button type="submit">Submit</button>

  {#if form}
    <p>uploaded {form.success} {form.fileUploads.map((fileUpload) => fileUpload.url)}</p>
  {/if}
</form>
