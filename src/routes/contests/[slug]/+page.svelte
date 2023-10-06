<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <h1>Contests</h1>
  <main>
    <a href="/contests/{data?.contest?.id}/contribute">Contribute</a>
    <div>hi</div>
  </main>
</div>
