<script>
  import { getEventBusContext } from "./Events";
  const events = getEventBusContext();
</script>

<div
  class="content-box px-6 pt-6 md:px-10 md:pt-10 lg:pt-[4.25rem] lg:mx-auto lg:max-w-container"
>
  <div class="flex justify-between items-center">
    <header>
      <h1 class="text-6 text-blue-100 leading-tight md:text-10">memory</h1>
    </header>

    <nav>
      <div class="md:hidden">
        <button
          class="bg-yellow-800 hover:bg-yellow-900 focus-visible:bg-yellow-900 text-white motion-safe:transition-colors leading-[2.5] rounded-full px-[1.125rem]"
          on:click={() => events.dispatch("showMobileMenu")}
        >
          Menu
        </button>
      </div>
      <div class="hidden md:flex md:gap-4 text-5">
        <button
          class="bg-yellow-800 hover:bg-yellow-900 focus-visible:bg-yellow-900 text-white motion-safe:transition-colors leading-[2.6] rounded-full px-7"
          on:click={() => events.dispatch("restartGame")}
        >
          Restart
        </button>

        <button
          class="bg-blue-900 hover:bg-blue-500 focus-visible:bg-blue-500 text-blue-200 hover:text-white focus-visible:text-white motion-safe:transition-colors leading-[2.6] rounded-full px-6"
          on:click={() => events.dispatch("openOptionsMenu")}
        >
          New Game
        </button>
      </div>
    </nav>
  </div>
</div>
