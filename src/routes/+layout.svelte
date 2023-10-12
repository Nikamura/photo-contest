<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";

  import IconUpload from "virtual:icons/fa/cloud-upload";
  import IconUser from "virtual:icons/fa/user";
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl normal-case" href="/">🍁 Photo Contest</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      {#if $page.data.session}
        <li><a href="/upload"><IconUpload class="inline" /> Upload</a></li>
        <li>
          <details>
            <summary
              ><IconUser class="inline" />
              <strong>{$page.data.session.user?.name?.split(" ")?.[0] ?? "User"}</strong></summary
            >

            <ul class="bg-base-100 p-2">
              <li><button on:click={() => signOut()}>Log out</button></li>
            </ul>
          </details>
        </li>
      {:else}
        <button
          on:click={() => signIn("google")}
          class="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >Sign in with Google</button
        >
      {/if}
    </ul>
  </div>
</div>

<slot />
