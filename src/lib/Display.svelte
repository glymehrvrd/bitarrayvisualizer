<script lang="ts">
  import BitArrayTag from "./BitArrayTag.vue";
  export default {
    name: "Display",
    components: {
      BitArrayTag,
    },
    data() {
      return {
        value: 0,
      };
    },
    props: {
      descriptions: {
        type: Array,
      },
    },
    mounted() {
      window.utools.onPluginEnter(() => {
        window.utools.setSubInput(({ text }) => {
          this.inputChange(text);
        }, "输入当前值");
      });
    },
    methods: {
      inputChange(text) {
        this.value = Number.parseInt(text);
      },
    },
  };
</script>

<div>
  <div class="display">
    <BitArrayTag :value="value" :descriptions="descriptions" />
  </div>
</div>

<style lang="scss" scoped>
</style>
