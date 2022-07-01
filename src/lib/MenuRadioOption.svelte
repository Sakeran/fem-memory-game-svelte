<script lang="ts">
  export let selected = false;
  export let groupId: string;
  export let option: string;

  let optId = groupId + "-" + option.replaceAll(" ", "-");
</script>

<input
  class="sr-only"
  type="radio"
  name={groupId}
  id={optId}
  checked={selected}
  on:input
/>
<label
  class="bg-blue-800 basis-full select-none cursor-pointer text-white rounded-full text-center leading-[2.5] md:leading-[2] ring-transparent ring-0 ring-offset-2 motion-safe:transition-colors"
  for={optId}>{option}</label
>

<style lang="postcss">
  :global(:focus-within) label {
    @apply ring-blue-800;
  }
  :global(:focus-within) > input:checked + label {
    @apply ring-2;
  }
  input:checked + label {
    @apply bg-blue-100;
  }
  input:not(:checked) + label:hover,
  input:not(:checked):focus-visible + label {
    @apply bg-blue-500;
  }
</style>
