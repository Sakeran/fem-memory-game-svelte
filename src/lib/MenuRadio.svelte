<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import MenuRadioOption from "./MenuRadioOption.svelte";

  const dispatch = createEventDispatcher();

  export let title: string;
  export let options: [string, ...string[]];

  let groupId = "mg-" + title.replace(" ", "-");
</script>

<fieldset class="flex flex-col gap-3">
  <legend class="text-sm text-blue-400 md:text-5 motion-safe:transition-colors"
    >{title}</legend
  >

  <div class="pt-3 md:pt-4 flex gap-3 md:gap-[1.875rem]">
    {#each options as option, idx}
      <MenuRadioOption
        {groupId}
        {option}
        selected={idx == 0}
        on:input={() => dispatch("radioInput", option)}
      />
    {/each}
  </div>
</fieldset>

<style>
  fieldset:focus-within legend {
    @apply text-blue-200;
  }
</style>
