<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  async function deleteContest(id: string) {
    if (!confirm("Are you sure you want to delete this contest?")) return;
    const response = await fetch(`/contests/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      location.reload();
    }
  }
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
  <h1 class="mb-3 text-2xl">Active contests</h1>
  <main class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    {#each data.contests as contest (contest.id)}
      <div class="card w-96 bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">{contest.name}</h2>
          <div class="card-actions justify-end">
            <a href="/contests/{contest.id}" class="btn">Participate</a>
            {#if data.isAdmin}
              <button on:click={() => deleteContest(contest.id)} class="btn btn-error"
                >Delete</button
              >
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </main>
</div>
