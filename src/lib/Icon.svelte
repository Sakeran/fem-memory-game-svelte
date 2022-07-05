<script context="module" lang="ts">
  import Bugs from "./icons/bugs.svelte";
  import Cat from "./icons/cat.svelte";
  import Cow from "./icons/cow.svelte";
  import Crow from "./icons/crow.svelte";
  import Dog from "./icons/dog.svelte";
  import Dove from "./icons/dove.svelte";
  import Dragon from "./icons/dragon.svelte";
  import Fish from "./icons/fish.svelte";
  import Frog from "./icons/frog.svelte";
  import Hippo from "./icons/hippo.svelte";
  import Horse from "./icons/horse.svelte";
  import Kiwi from "./icons/kiwi.svelte";
  import Locust from "./icons/locust.svelte";
  import Mosquito from "./icons/mosquito.svelte";
  import Otter from "./icons/otter.svelte";
  import Shrimp from "./icons/shrimp.svelte";
  import Spider from "./icons/spider.svelte";
  import Worm from "./icons/worm.svelte";

  const icons = [
    [Bugs, "bugs"],
    [Cat, "cat"],
    [Cow, "cow"],
    [Crow, "crow"],
    [Dog, "dog"],
    [Dragon, "dragon"],
    [Fish, "fish"],
    [Frog, "frog"],
    [Hippo, "hippo"],
    [Horse, "horse"],
    [Dove, "dove"],
    [Kiwi, "kiwi"],
    [Locust, "locust"],
    [Mosquito, "mosquito"],
    [Otter, "otter"],
    [Shrimp, "shrimp"],
    [Spider, "spider"],
    [Worm, "worm"],
  ];

  function randomizeIcons() {
    for (let i = icons.length - 1; i > 0; i--) {
      const ridx = Math.floor(Math.random() * (i + 1));
      const tmp = icons[i];
      icons[i] = icons[ridx];
      icons[ridx] = tmp;
    }
  }

  export function getIconName(idx: number) {
    const entry = icons[idx];
    if (!entry) return "";
    return entry[1] as string;
  }

  randomizeIcons();
</script>

<script lang="ts">
  export let iconIndex = 0;
</script>

<svelte:component this={icons[iconIndex][0]} />
