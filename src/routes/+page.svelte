<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<h1>My Blog</h1>
	<main>
		<div>
			<!-- 2. -->
			{#each data.contests as contest (contest.id)}
				<div class="contest" on:click={() => goto(`/contests/${contest.id}`)}>
					<h2>{contest.name}</h2>
				</div>
			{/each}
		</div>
	</main>
</div>

<style>
	div {
		color: inherit;
		padding: 2rem;
	}
</style>
