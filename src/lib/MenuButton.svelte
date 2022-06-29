<script lang="ts">
  export let selected = false;

  const baseClasses =
    "py-[0.625rem] px-4 rounded-full text-white text-4 md:text-[1.625rem] motion-safe:transition-colors ";

  let classes = "";
  $: classes =
    baseClasses +
    (selected
      ? "bg-blue-200"
      : "bg-blue-800 hover:bg-blue-500 focus:bg-blue-500");
</script>

<button class={classes} on:click><slot /></button>
