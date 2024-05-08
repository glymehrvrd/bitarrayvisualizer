<script setup lang="ts">
import { computed } from "@vue/reactivity";
import Tag from "./Tag.vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  descriptions: {
    type: Array<String>,
    default: [],
  },
});

const tags = computed(() => {
  const result = [];
  let mask: BigInt = 1n;
  let value: BigInt = BigInt(props.value);
  for (let i = 0; i < props.descriptions.length; i++) {
    const desc = props.descriptions[i];
    result.push({
      name: desc,
      exist: (mask.valueOf() & value.valueOf()) === mask,
    });
    mask = mask.valueOf() << 1n;
  }
  return result;
});
</script>

<template>
  <div class="bitarraytag">
    <Tag
      v-for="tag in tags"
      :key="(tag.name as string)"
      :disabled="!tag.exist"
      >{{ tag.name }}</Tag
    >
  </div>
</template>

<style lang="scss" scoped></style>
