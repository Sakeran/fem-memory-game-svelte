<script lang="ts">
  import { formatScreenReaderTime, formatTime } from "./helpers/formatTime";

  import { getSinglePlayerGameState } from "./stores/singlePlayerGameState";

  const state = getSinglePlayerGameState();

  let time = "0:00";
  $: time = formatTime($state.timeInSeconds);

  let srTime = "0 minutes, 0 seconds";
  $: srTime = formatScreenReaderTime($state.timeInSeconds);
</script>

<aside class="flex gap-[1.5625rem] md:gap-[1.875rem] justify-center">
  <h2 class="sr-only">Game Status</h2>
  <div
    class="bg-blue-900 py-[0.625rem] rounded-sm md:rounded-md flex flex-col md:flex-row md:justify-between md:px-6 md:items-center text-center basis-64"
  >
    <span class="text-sm text-blue-400 md:text-4.125">Time</span>
    <span class="text-blue-200 text-6 md:text-8"
      ><span class="sr-only">{srTime}</span><span aria-hidden="true"
        >{time}</span
      ></span
    >
  </div>

  <div
    class="bg-blue-900 py-[0.625rem] rounded-sm md:rounded-md flex flex-col md:flex-row md:justify-between md:px-6 md:items-center text-center basis-64"
  >
    <span class="text-sm text-blue-400 md:text-4.125">Moves</span>
    <span class="text-blue-200 text-6 md:text-8">{$state.movesMade}</span>
  </div>
</aside>
