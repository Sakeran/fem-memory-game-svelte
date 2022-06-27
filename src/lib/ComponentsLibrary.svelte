<script>
  import Icon from "./Icon.svelte";
  import Token from "./Token.svelte";
</script>

<h2 class="text-14 font-bold tracking-wide">Components Library</h2>
<div class="mt-8 px-8">
  <h3 class="text-8 mb-4">Icons</h3>
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
  </div>

  <h3 class="text-8 mt-8 mb-4">Tokens</h3>
  <div class="flex justify-around items-center">
      <div class="w-[7.375rem] aspect-square">
        <div style:--token-fs={"3.5rem"}>
            <Token />
        </div>
      </div>
      <div class="w-[5.125rem] aspect-square">
        <div style:--token-fs={"2.75rem"}>
            <Token />
        </div>
      </div>
  </div>
</div>
