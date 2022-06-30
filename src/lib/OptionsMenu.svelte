<script lang="ts">
  import { onMount } from "svelte";

  import BigButton from "./BigButton.svelte";
  import { getEventBusContext } from "./Events";
  import MenuRadio from "./MenuRadio.svelte";

  let events = getEventBusContext();

  let modal: HTMLDivElement;
  let wrapStart: HTMLDivElement;
  let wrapEnd: HTMLDivElement;

  function focusFirst() {
    wrapStart &&
      (
        wrapStart.nextElementSibling.querySelector("input") as HTMLInputElement
      ).focus();
  }

  function focusLast() {
    wrapEnd && (wrapEnd.previousElementSibling as HTMLButtonElement).focus();
  }

  // Focus wrapping
  function wrap(e: KeyboardEvent) {
    if (e.key !== "Tab") return;
    if (!(wrapEnd && wrapStart)) return;

    const focusable = Array.from(modal.querySelectorAll("*")).filter(
      (n) => "tabIndex" in n && (n as HTMLElement).tabIndex >= 0
    );

    let currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1 && e.shiftKey) {
      currentIndex = 0;
    }

    currentIndex += focusable.length + (e.shiftKey ? -1 : 1);
    currentIndex %= focusable.length;

    if (focusable[currentIndex] === wrapStart) {
      focusLast();
      e.preventDefault();
    }

    if (focusable[currentIndex] === wrapEnd) {
      focusFirst();
      e.preventDefault();
    }
  }

  function newGame() {
    events.dispatch("startNewGame");
  }

  onMount(() => {
    focusFirst();
  });
</script>

<svelte:window on:keydown={wrap} />

<div class=" z-30 fixed inset-0 bg-blue-100" />

<div class="z-40 fixed inset-0">
  <div
    class="px-6 mt-20"
    role="dialog"
    aria-modal="true"
    aria-label="Memory Game Setup"
  >
    <div class="text-center text-white text-8 mb-11">memory</div>
    <div
      class="bg-white p-6 md:p-14 rounded-sm md:rounded-lg max-w-[40.875rem] mx-auto"
      bind:this={modal}
    >
      <form class="flex flex-col gap-6" on:submit|preventDefault={newGame}>
        <div
          bind:this={wrapStart}
          tabindex="0"
          class="absolute"
          aria-hidden="true"
        />
        <MenuRadio title="Select Theme" options={["Numbers", "Icons"]} />
        <MenuRadio title="Numbers of Players" options={["1", "2", "3", "4"]} />
        <MenuRadio title="Grid Size" options={["4x4", "6x6"]} />
        <div class="pt-2">
          <BigButton on:click{newGame}>Start Game</BigButton>
          <div
            bind:this={wrapEnd}
            tabindex="0"
            class="absolute"
            aria-hidden="true"
          />
        </div>
      </form>
    </div>
  </div>
</div>
