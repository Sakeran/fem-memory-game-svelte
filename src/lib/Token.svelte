<script lang="ts">
  import { getContext } from "svelte";

  import { expoOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import type { EventBus } from "./Events";
  import { reducedMotion } from "./helpers/reducedMotion";

  import Icon, { getIconName } from "./Icon.svelte";

  const events: EventBus = getContext("eventBus");

  export let selectable: boolean;
  export let value: number;
  export let useIcon: boolean;
  export let column: number;
  export let row: number;

  let state: "Hidden" | "Selected" | "Matched" = "Hidden";

  // Used by screen readers / logs
  let displayValue: string = useIcon
    ? getIconName(value)
    : (value + 1).toString();

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
  $: matchScale.set(state === "Matched" ? 1 : 0, {
    duration: reducedMotion() ? 0 : 400,
  }); // temp

  const tokenRotation = tweened(180, {
    easing: expoOut,
  });

  function hide() {
    if (state !== "Selected") return;

    state = "Hidden";

    if (reducedMotion()) {
      return tokenRotation
        .set(180, { duration: 0 })
        .then(() => new Promise((r) => setTimeout(r, 400)));
    }

    return tokenRotation
      .set(0, { duration: 0 })
      .then(() => tokenRotation.set(180));
  }

  function select() {
    if (state !== "Hidden") return;

    state = "Selected";

    if (reducedMotion()) {
      return tokenRotation
        .set(0, { duration: 0 })
        .then(() => new Promise((r) => setTimeout(r, 400)));
    }

    return tokenRotation
      .set(180, { duration: 0 })
      .then(() => tokenRotation.set(360));
  }

  function handleClick(e) {
    e.preventDefault();
    if (!clickable) return;

    const animationPromise = select();

    events.dispatch("tokenClick", {
      row,
      column,
      value,
      displayValue,
      animation: animationPromise,
    });
    state = "Selected";
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "Left":
      case "ArrowLeft":
        e.preventDefault();
        events.dispatch("MoveFocusLeft", { row, column });
        return;
      case "Right":
      case "ArrowRight":
        e.preventDefault();
        events.dispatch("MoveFocusRight", { row, column });
        return;
      case "Up":
      case "ArrowUp":
        e.preventDefault();
        events.dispatch("MoveFocusUp", { row, column });
        return;
      case "PageUp":
        e.preventDefault();
        events.dispatch("MoveFocusToPreviousRow", { row, column });
        return;
      case "Down":
      case "ArrowDown":
        e.preventDefault();
        events.dispatch("MoveFocusDown", { row, column });
        return;
      case "PageDown":
        e.preventDefault();
        events.dispatch("MoveFocusToNextRow", { row, column });
        return;
      case "Home":
        e.preventDefault();
        if (e.ctrlKey) {
          events.dispatch("MoveFocusToGridStart");
          return;
        }
        events.dispatch("MoveFocusToRowStart", { row, column });
        return;
      case "End":
        e.preventDefault();
        if (e.ctrlKey) {
          events.dispatch("MoveFocusToGridEnd");
          return;
        }
        events.dispatch("MoveFocusToRowEnd", { row, column });
        return;
    }
  }
</script>

<div
  class="grid"
  role="cell"
  aria-colindex={column + 1}
  aria-rowindex={row + 1}
>
  <button
    id={`token-${row}-${column}`}
    on:click={handleClick}
    on:focus={(e) => events.dispatch("tokenFocus", e)}
    on:keydown={handleKeydown}
    tabindex="0"
    aria-label={`Row ${row + 1} Column ${column + 1}${
      state !== "Hidden" ? ". Revealed value" + displayValue : ""
    }`}
    class:cursor-pointer={clickable}
    class:cursor-default={!clickable}
    class="token-container outline-0 focus-visible:outline-1 outline-blue-100 relative aspect-square rounded-round grid place-items-center text-white text-token origin-center select-none"
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
        aria-hidden="true"
        class="z-10 absolute inset-0 grid place-items-center pointer-events-none"
      >
        {#if useIcon}
          <div class="w-1/2">
            <Icon iconIndex={value} />
          </div>
        {:else}
          {value + 1}
        {/if}
      </div>
    </div>

    <!-- Back Face -->
    <div
      class="token-bf z-10 absolute inset-0 bg-blue-100 rounded-round pointer-events-none motion-safe:transition-colors motion-safe:duration-75"
    />
  </button>
</div>

<style lang="postcss">
  button {
    /* Addresses a visual glitch in Chrome. */
    -webkit-tap-highlight-color: transparent;
  }

  .token-ff {
    transform: rotateY(calc(var(--token-rotate, 0deg)));
    backface-visibility: hidden;
  }

  .token-bf {
    transform: rotateY(calc(var(--token-rotate, 0deg) + 180deg));
    backface-visibility: hidden;
  }

  .token-container:hover > .token-bf,
  .token-container:focus-visible > .token-bf {
    @apply bg-blue-500;
  }
</style>
