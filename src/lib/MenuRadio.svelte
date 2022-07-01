<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import MenuRadioOption from "./MenuRadioOption.svelte";

  const dispatch = createEventDispatcher();

  export let title: string;
  export let options: [string, ...string[]];
  export let activeIndex: number = 0;

  let groupId = "mg-" + title.replace(" ", "-");
</script>

<fieldset class="flex flex-col">
  <legend class="text-sm text-blue-400 md:text-5 motion-safe:transition-colors"
    >{title}</legend
  >

  <div class="pt-3 md:pt-4 flex gap-3 md:gap-[1.875rem] md:text-[1.625rem]">
    {#each options as option, idx}
      <MenuRadioOption
        {groupId}
        {option}
        selected={idx == activeIndex}
        on:input={() => dispatch("radioInput", option)}
      />
    {/each}
  </div>
</fieldset>

<style lang="postcss">
  fieldset:focus-within legend {
    @apply text-blue-200;
  }
</style>
