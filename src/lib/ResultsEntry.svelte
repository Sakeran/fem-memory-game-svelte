<script lang="ts">
  export let heading: string;
  export let value: string;
  export let highlight: boolean = false;
  export let srValue: string = undefined;
</script>

<div
  class:bg-blue-100={highlight}
  class:bg-blue-900={!highlight}
  class="flex items-center justify-between px-4 py-3 md:px-8 md:py-5 rounded-sm md:rounded-md"
>
  <dt
    class:text-white={highlight}
    class:text-blue-400={!highlight}
    class="text-xxs leading-tight md:text-4.125"
  >
    {heading}
  </dt>
  <dd
    class:text-white={highlight}
    class:text-blue-100={!highlight}
    class="text-5 leading-tight md:text-8"
  >
    {#if srValue}
      <span class="sr-only">{srValue}</span>
    {/if}
    <span aria-hidden={!!srValue}>{value}</span>
  </dd>
</div>
