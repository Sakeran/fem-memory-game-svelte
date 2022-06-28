<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import { boardMachine } from "../machines/boardMachine";
  import Token from "./Token.svelte";

  const { service } = useMachine(boardMachine, { context: { size: 6 } });
  const gridSize = $service.context.size;
</script>

<div class="grid grid-cols-6 gap-3">
  {#each $service.context.tokens as token}
    <Token
      tokenId={token.id}
      value={token.value}
      useIcon={$service.context.icons}
    />
  {/each}
</div>
