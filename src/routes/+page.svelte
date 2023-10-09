<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
  <h1 class="mb-3 text-2xl">Active contests</h1>
  <main>
    <div>
      {#each data.contests as contest (contest.id)}
        <a href="/contests/{contest.id}">
          <div class="contest">
            <h2>{contest.name}</h2>
          </div>
        </a>
      {/each}
    </div>
  </main>
</div>
