<script>
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
</script>

<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
  <main>
    <div>
      {#if $page.data.session}
        {#if $page.data.session.user?.image}
          <span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
        {/if}
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
