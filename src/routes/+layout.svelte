<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";

  import IconUpload from "virtual:icons/fa/cloud-upload";
  import { goto } from "$app/navigation";
</script>

<header class="bg-white">
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <div class="flex lg:flex-1">
      <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">CN-</span>
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt=""
        />
      </a>
    </div>
    <div class="flex flex-1 justify-end">
      {#if $page.data.session}
        {#if $page.data.session.user?.image}
          <span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
        {/if}
        <span class="mr-1 hidden sm:block">
          Hey, <strong>{$page.data.session.user?.name ?? "User"}</strong>!
        </span>
        <button
          class="mr-1 rounded px-2 py-1 text-xs font-semibold shadow-sm hover:bg-indigo-100"
          on:click={() => goto("/upload")}
        >
          <IconUpload class="inline" /> Upload
        </button>
        <button
          on:click={() => signOut()}
          class="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >Sign out</button
        >
      {:else}
        <button
          on:click={() => signIn("google")}
          class="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >Sign in with Google</button
        >
      {/if}
    </div>
  </nav>
</header>

<div class="min-h-screen bg-white text-black dark:bg-slate-800 dark:text-white">
  <slot />
</div>
