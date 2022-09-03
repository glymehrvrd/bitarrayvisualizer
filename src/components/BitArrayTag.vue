<script setup lang="ts">
import { computed } from '@vue/reactivity';
import Tag from './Tag.vue'

const props = defineProps({
    value: {
        type: Number,
        default: 0,
    },
    descriptions: {
        type: Array<String>,
        default: [],
    }
});

const tags = computed(() => {
    const result = [];
    let mask = 1;
    for (let i = 0; i < props.descriptions.length; i++) {
        const desc = props.descriptions[i];
        result.push({ name: desc, exist: (mask & props.value) == mask });
        mask <<= 1;
    }
    return result;
})
</script>

<template>
    <div class="bitarraytag">
        <Tag v-for="tag in tags" :key="(tag.name as string)" :disabled="!tag.exist">{{ tag.name }}</Tag>
    </div>
</template>

<style lang="scss" scoped>
</style>