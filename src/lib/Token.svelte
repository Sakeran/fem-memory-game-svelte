<script lang="ts">
  import { getContext } from "svelte";

  import { expoOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import type { EventBus } from "./Events";

  import Icon from "./Icon.svelte";

  const events: EventBus = getContext("eventBus");

  export let selectable: boolean;
  export let value: number;
  export let useIcon: boolean;

  let state: "Hidden" | "Selected" | "Matched" = "Hidden";

  events.on("matchedTokens", (tokenValue) => {
    if (tokenValue == value) {
      state = "Matched";
    }
  });

  events.on("endedTurn", () => {
    hide();
  });

  let clickable: boolean;
  $: clickable = selectable && state === "Hidden";

  const matchScale = tweened(0, { easing: expoOut });
  $: matchScale.set(state === "Matched" ? 1 : 0); // temp

  const tokenRotation = tweened(180, { easing: expoOut });

  function hide() {
    if (state !== "Selected") return;

    state = "Hidden";
    return tokenRotation
      .set(0, { duration: 0 })
      .then(() => tokenRotation.set(180));
  }

  function select() {
    if (state !== "Hidden") return;

    state = "Selected";

    return tokenRotation
      .set(180, { duration: 0 })
      .then(() => tokenRotation.set(360));
  }

  function handleClick(e) {
    e.preventDefault();
    if (!clickable) return;

    const animationPromise = select();

    events.dispatch("tokenClick", { value, animation: animationPromise });
    state = "Selected";
  }
</script>

<div
  on:click={handleClick}
  class:cursor-pointer={clickable}
  class="token-container relative aspect-square rounded-round grid place-items-center text-white text-token origin-center select-none"
  style:--token-match-scale={$matchScale}
  style:--token-rotate={`${$tokenRotation}deg`}
>
  <!-- Front Face -->
  <div class="token-ff absolute inset-0">
    <!-- Background -->
    <div
      class="absolute bg-blue-800 inset-0 rounded-round z-0 pointer-events-none"
    />

    <!-- Matched Background -->
    <div
      class="absolute bg-yellow-800 inset-0 rounded-round z-0 pointer-events-none scale-[var(--token-match-scale)]"
    />

    <!-- Icon/Number -->
    <div
      class="z-10 absolute inset-0 grid place-items-center pointer-events-none"
    >
      {#if useIcon}
        <div>
          <Icon iconIndex={value} />
        </div>
      {:else}
        {value + 1}
      {/if}
    </div>
  </div>

  <!-- Back Face -->
  <div
    class="token-bf z-10 absolute inset-0 bg-blue-100 rounded-round pointer-events-none transition-colors duration-75"
  />
</div>

<style>
  .token-ff {
    transform: rotateY(calc(var(--token-rotate, 0deg)));
    backface-visibility: hidden;
  }

  .token-bf {
    transform: rotateY(calc(var(--token-rotate, 0deg) + 180deg));
    backface-visibility: hidden;
  }

  .token-container:hover > .token-bf,
  .token-container:focus > .token-bf {
    @apply bg-blue-500;
  }
</style>
