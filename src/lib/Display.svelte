<script lang="ts">
  import BitArrayTag from "./BitArrayTag.svelte";
  import { onMount } from "svelte";

  const inputChange = function (text) {};
  onMount(() => {
    window.utools.onPluginEnter(() => {
      window.utools.setSubInput(({ text }) => {
        this.inputChange(text);
      }, "输入当前值");
    });
  });
</script>

<div>
  <div class="display">
    <BitArrayTag :value="value" :descriptions="descriptions" />
  </div>
</div>

<style lang="scss" scoped>
</style>
