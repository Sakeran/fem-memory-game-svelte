<script lang="ts">
  import Icon from "./Icon.svelte";
  import Token from "./Token.svelte";
  import TokenBoard from "./TokenBoard.svelte";
  import PrimaryButton from "./PrimaryButton.svelte";
  import BigButton from "./BigButton.svelte";
  import SecondaryButton from "./SecondaryButton.svelte";
  import MenuRadio from "./MenuRadio.svelte";
  import SinglePlayerStatus from "./SinglePlayerStatus.svelte";
  import MultiPlayerStatus from "./MultiPlayerStatus.svelte";
  import { getContext } from "svelte";
  import type { EventBus } from "./Events";
  import ResultsEntry from "./ResultsEntry.svelte";

  const events: EventBus = getContext("eventBus");
</script>

<h2 class="text-14 font-bold tracking-wide">Components Library</h2>
<div class="mt-8 px-8">
  <!-- <h3 class="text-8 mb-4">Icons</h3>
  <div class="grid grid-cols-6 gap-8 text-blue-100">
    <Icon iconIndex={0} />
    <Icon iconIndex={1} />
    <Icon iconIndex={2} />
    <Icon iconIndex={3} />
    <Icon iconIndex={4} />
    <Icon iconIndex={5} />
    <Icon iconIndex={6} />
    <Icon iconIndex={7} />
    <Icon iconIndex={8} />
    <Icon iconIndex={9} />
    <Icon iconIndex={10} />
    <Icon iconIndex={11} />
    <Icon iconIndex={12} />
    <Icon iconIndex={13} />
    <Icon iconIndex={14} />
    <Icon iconIndex={15} />
    <Icon iconIndex={16} />
    <Icon iconIndex={17} />
    <Icon iconIndex={18} />
  </div> -->

  <!-- <h3 class="text-8 mt-8 mb-4">Tokens</h3>
  <div class="flex justify-around items-center">
    <div class="w-[7.375rem] aspect-square">
      <div style:--token-fs={"3.5rem"}>
        <Token selectable={true} useIcon={true} value={3} />
      </div>
    </div>
    <div class="w-[5.125rem] aspect-square">
      <div style:--token-fs={"2.75rem"}>
        <Token selectable={true} useIcon={true} value={3} />
      </div>
    </div>
  </div> -->

  <!-- <h3 class="text-8 mt-8 mb-4">Token Grid</h3>
  
  <div class="max-w-[572px]">
    <TokenBoard />
  </div> -->

  <!-- <h3 class="text-8 mt-8 mb-4">Buttons</h3>
  <div class="flex gap-4">
    <PrimaryButton>Restart</PrimaryButton>
    <SecondaryButton>New Game</SecondaryButton>
  </div>
  <div class="max-w-lg py-4">
    <BigButton>Start Game</BigButton>
  </div> -->

  <!-- <h3 class="text-8 mt-8 mb-4">Menu Radio</h3>
  <div class="space-y-8">
    <MenuRadio
    title="Select Theme"
    options={["Numbers", "Icons"]}
    on:radioInput={(v) => console.log(v.detail)}
    />
    <MenuRadio title="Numbers of Players" options={["1", "2", "3", "4"]} />
  </div> -->

  <!-- <h3 class="text-8 mt-8 mb-4">Single Player Status</h3>
  <SinglePlayerStatus /> -->

  <!-- <h3 class="text-8 mt-8 mb-4">Multi Player Status</h3>
  <MultiPlayerStatus /> -->

  <h3 class="text-8 mt-8 mb-4">ResultsEntry</h3>
  <div class="space-y-4">
    <ResultsEntry heading="Time Elapsed" value="1:53" />
    <ResultsEntry heading="Player 3 (Winner!)" value="6 Pairs" highlight />
  </div>
</div>
