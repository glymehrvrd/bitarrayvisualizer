<script lang="ts">
import Tag from './Tag'
export let value: number;
export let descriptions: string[];

$: {
            const tags = []
            let mask = 1
            for (let i = 0; i < this.descriptions.length; i++) {
                const desc = this.descriptions[i]
                tags.push({ name: desc, exist: (mask & this.value) == mask })
                mask <<= 1
            }
}
</script>

    <div class="bitarraytag">
        <Tag v-for="tag in tags" :key="tag.name" :disabled="!tag.exist">{{ tag.name }}</Tag>
    </div>

<style lang="scss" scoped>
</style>