<script>
  import { getEventBusContext } from "./Events";
  import PrimaryButton from "./PrimaryButton.svelte";
  import SecondaryButton from "./SecondaryButton.svelte";

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
        <PrimaryButton on:click={() => events.dispatch("showMobileMenu")}
          >Menu</PrimaryButton
        >
      </div>
      <div class="hidden md:flex md:gap-4">
        <PrimaryButton>Restart</PrimaryButton>
        <SecondaryButton>New Game</SecondaryButton>
      </div>
    </nav>
  </div>
</div>
