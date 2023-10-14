<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";

  import IconUpload from "virtual:icons/fa/cloud-upload";
  import IconUser from "virtual:icons/fa/user";
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl normal-case" href="/"
      >📸🍁🇱🇹<span class="hidden sm:inline">Photo Contest</span></a
    >
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal z-10 px-1">
      {#if $page.data.session}
        <li class="hidden sm:flex"><a href="/upload"><IconUpload class="inline" /> Upload</a></li>
        <li>
          <details>
            <summary
              ><IconUser class="inline" />
              <strong>{$page.data.session.user?.name?.split(" ")?.[0] ?? "User"}</strong></summary
            >

            <ul class="bg-base-100 p-2">
              <li class="flex sm:hidden">
                <a href="/upload"><IconUpload class="inline" /> Upload</a>
              </li>

              <li>
                <a href="/users/{$page.data.session.user?.id}/uploads">My Uploads</a>
              </li>
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
