<script setup lang="ts">
import { onMounted, ref } from "vue";
import BitArrayTag from "./BitArrayTag.vue";

const value = ref(0n);

const props = defineProps({
  descriptions: {
    type: Array<String>,
  },
});

onMounted(() => {
  // @ts-ignore
  window.utools?.onPluginEnter(() => {
    // @ts-ignore
    window.utools?.setSubInput(({ text }) => {
      inputChange(text);
    }, "输入当前值");
  });
});

const findSetBits = function (text: string) {
  const number = BigInt(text);
  const binaryString = number.toString(2);
  const setBits = [];
  for (let i = binaryString.length - 1; i >= 0; i--) {
    if (binaryString[i] === "1") {
      setBits.push(binaryString.length - i);
    }
  }
  return setBits;
};

const bitList = ref(findSetBits(value.value.toString()));
const inputChange = function (text: string) {
  value.value = BigInt(text);
  bitList.value = findSetBits(text);
};
</script>

<template>
  <div>
    <div class="display">
      <BitArrayTag :value="value.toString()" :descriptions="descriptions" />
      <div id="bit-list">被设置的位：{{ bitList }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#bit-list {
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>
