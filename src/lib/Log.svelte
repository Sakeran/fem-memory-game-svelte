<script lang="ts">
  import { EventBus, getEventBusContext } from "./Events";

  let messages = [];

  const events: EventBus = getEventBusContext();

  events.on("restartGame", () => {
    messages = [];
  })

  events.on("logMessage", (message) => {
    messages.push(message);
    messages = messages;
  });
</script>

<div role="log" class:sr-only={true}>
  {#each messages as m}
    <output>{m}</output>
  {/each}
</div>
