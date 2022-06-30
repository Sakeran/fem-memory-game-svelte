<script lang="ts">
  export let autofocus: boolean = false;
</script>

<!-- svelte-ignore a11y-autofocus -->
<button
  autofocus={autofocus}
  on:click
  class="bg-yellow-800 hover:bg-yellow-900 focus:bg-yellow-900 py-[0.625rem] px-4 rounded-full text-white text-4 md:text-5 leading-tight motion-safe:transition-colors"
  ><slot /></button
>
