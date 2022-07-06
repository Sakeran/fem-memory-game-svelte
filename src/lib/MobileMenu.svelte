<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { scale, fade } from "svelte/transition";

  import type { EventBus } from "./Events";

  const events: EventBus = getContext("eventBus");

  let modal: HTMLDivElement;

  // Return focus on close
  const returnFocusTo =
    typeof document !== "undefined" && document.activeElement;

  if (
    returnFocusTo &&
    "focus" in returnFocusTo &&
    typeof (returnFocusTo as HTMLElement).focus === "function"
  ) {
    onDestroy(() => {
      (returnFocusTo as HTMLElement).focus();
    });
  }

  // Escape Key and focus wrapping
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == "Escape") {
      close();
      return;
    }

    if (e.key == "Tab") {
      const nodes = modal.querySelectorAll("*");
      const focusable = Array.from(nodes).filter(
        (el) => "tabIndex" in el && (el as HTMLElement).tabIndex >= 0
      );

      let currentIndex = focusable.indexOf(
        document.activeElement as HTMLElement
      );
      if (currentIndex === -1 && e.shiftKey) {
        currentIndex = 0;
      }

      currentIndex += focusable.length + (e.shiftKey ? -1 : 1);
      currentIndex %= focusable.length;

      (focusable[currentIndex] as HTMLElement).focus();
      e.preventDefault();
    }
  }

  function close() {
    events.dispatch("closeMobileMenu");
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div
  class="z-30 fixed inset-0 bg-black/50"
  on:click={close}
  transition:fade={{ duration: 150 }}
/>

<div
  class="z-40 fixed inset-0 grid place-items-center px-6 pointer-events-none"
>
  <div
    transition:scale
    role="dialog"
    aria-modal="true"
    aria-label="Game Menu"
    class="z-50 w-full bg-white text-4.125 rounded-md flex flex-col gap-4 p-6 pointer-events-auto"
    bind:this={modal}
  >
    <!-- svelte-ignore a11y-autofocus -->
    <button
      class="bg-yellow-800 hover:bg-yellow-900 focus-visible:bg-yellow-900 text-white motion-safe:transition-colors leading-[2.7] rounded-full"
      on:click={() => events.dispatch("restartGame")}
      autofocus>Restart</button
    >
    <button
      class="bg-blue-900 hover:bg-blue-500 focus-visible:bg-blue-500 text-blue-200 hover:text-white focus-visible:text-white motion-safe:transition-colors leading-[2.7] rounded-full"
      on:click={() => events.dispatch("openOptionsMenu")}>New Game</button
    >
    <button
      class="bg-blue-900 hover:bg-blue-500 focus-visible:bg-blue-500 text-blue-200 hover:text-white focus-visible:text-white motion-safe:transition-colors leading-[2.7] rounded-full"
      on:click={close}>Resume Game</button
    >
  </div>
</div>
