<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8 lg:py-20">
  <h1 class="mb-3 text-2xl">Active contests</h1>
  <main>
    <div>
      <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        {#each data.contests as contest (contest.id)}
          <div class="bg-white px-4 py-5 text-black sm:px-6">
            <a href="/contests/{contest.id}">
              <h2>{contest.name}</h2>
              <small>Contributions: 0</small>
              <small>Deadline: XXXX-XX-XX XX:XX</small>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </main>
</div>
