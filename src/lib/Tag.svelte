<script lang="ts">
  export let disabled: boolean = false;
</script>

<span class="tag" class:tag-disabled={disabled}>
  <slot />
</span>

<style lang="scss" scoped>
  .tag {
    background-color: rgb(65, 164, 15);
    font-family: PingFang SC, Microsoft YaHei, Arial Regular;
    box-sizing: border-box;
    margin: 5px;
    list-style: none;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    padding: 0 8px;
    height: 24px;
    font-size: 14px;
    line-height: 22px;
    color: white;
    border-radius: 3px;
    border: 1px solid transparent;
    white-space: nowrap;
  }
  .tag-disabled {
    line-height: 22px;
    color: black;
    background-color: rgb(231, 231, 231);
  }
</style>
