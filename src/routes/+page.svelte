<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <h1>My Blog</h1>
  <main>
    <div>
      <a href="/admin/uploads">
        <button>Uploads Admin</button>
      </a>
    </div>
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

<style lang="postcss">
  div {
    color: inherit;
    padding: 2rem;
  }
</style>
