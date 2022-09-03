<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BitArrayTag from './BitArrayTag.vue'

let value = ref(0);

const props = defineProps({
  descriptions: {
    type: Array<String>,
  }
});

onMounted(() => {
  // @ts-ignore
  window.utools?.onPluginEnter(() => {
    // @ts-ignore
    window.utools?.setSubInput(({ text }) => {
      inputChange(text)
    }, '输入当前值')
  });
});

const inputChange = function (text: string) {
  value.value = Number.parseInt(text);
}
</script>

<template>
  <div>
    <div class="display">
      <BitArrayTag :value="value" :descriptions="descriptions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>