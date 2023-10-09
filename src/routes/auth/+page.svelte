<script>
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
</script>

<div class="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8 lg:py-20">
  <main>
    <div>
      {#if $page.data.session}
        <span class="signedInText">
          <small>Signed in as</small><br />
          <strong>{$page.data.session.user?.name ?? "User"}</strong>
        </span>
        <button on:click={() => signOut()} class="button">Sign out</button>
      {:else}
        <span class="notSignedInText">You are not signed in</span>
        <button on:click={() => signIn("google")} class="font-bold">Sign In with Google</button>
      {/if}
    </div>
  </main>
</div>
