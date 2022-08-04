<template>
    <div class="bitarraytag">
        <Tag v-for="tag in tags" :key="tag.name" :disabled="!tag.exist">{{ tag.name }}</Tag>
    </div>
</template>

<script>
import Tag from './Tag'
export default {
    name: 'BitArrayTag',
    props: {
        value: {
            type: Number
        },
        descriptions: {
            type: Array
        }
    },
    components: {
        Tag
    },
    computed: {
        tags() {
            const result = []
            let mask = 1
            for (let i = 0; i < this.descriptions.length; i++) {
                const desc = this.descriptions[i]
                result.push({ name: desc, exist: (mask & this.value) == mask })
                mask <<= 1
            }
            return result
        }
    }
}
</script>

<style lang="scss" scoped>
</style>