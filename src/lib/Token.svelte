<script lang="ts">
  import { expoOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { useMachine, useSelector } from "@xstate/svelte";

  import Icon from "./Icon.svelte";
  import { tokenMachine } from "../machines/tokenMachine";

  export let tokenId: string;
  export let value: number;
  export let useIcon: boolean;
  export let selectable: boolean;

  const { service, send } = useMachine(tokenMachine, {
    context: { value, id: tokenId },
  });

  const idx = useSelector(service, (state) => state.context.value);
  const isHidden = useSelector(service, (state) => state.matches("Hidden"));
  const isMatched = useSelector(service, (state) => state.matches("Matched"));

  const matchScale = tweened(0, { easing: expoOut });
  $: matchScale.set($isMatched ? 1 : 0); // temp

  const tokenRotation = tweened(180, { easing: expoOut });

  function handleClick(e) {
    e.preventDefault();
    if (!selectable && $isHidden) return;
    send({ type: "tokenClick", ...service.state.context });
  }
</script>

<div
  on:click={handleClick}
  class:cursor-pointer={selectable && $isHidden}
  class="relative aspect-square rounded-round grid place-items-center text-white text-token origin-center"
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
    <div class="z-10 absolute inset-0 grid place-items-center">
      {#if useIcon}
        <div class="w-token-icon">
          <Icon iconIndex={$idx} />
        </div>
      {:else}
        {$idx + 1}
      {/if}
    </div>
  </div>

  <!-- Back Face -->
  <div
    class="token-bf z-10 absolute inset-0 bg-blue-100 rounded-round pointer-events-none"
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
</style>
