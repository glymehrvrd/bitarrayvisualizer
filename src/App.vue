<template>
  <div id="app">
    <Display :descriptions="currentDescriptions"></Display>
    <StatusBar :enum_defs="enum_defs" v-model="selected_enum_def_index" @onSetting="drawer = true" />
    <el-drawer direction="ltr" :visible.sync="drawer" title="枚举定义列表">
      <div class="setting-drawer">
        <div class="setting-enumdef-list">
          <div class="setting-enumdef-list-item" v-for="(enum_def, index) in enum_defs" :key="enum_def.name">
            <span>{{ enum_def.name }} </span>
            <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
              @click="handleDeleteEnumDef(index)">
              <path d="M6 12V6H7V12H6Z" fill="currentColor" fill-opacity="0.9"></path>
              <path d="M9 6V12H10V6H9Z" fill="currentColor" fill-opacity="0.9"></path>
              <path
                d="M10.5 3H14V4H13V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V4H2V3H5.5L5.5 1.8C5.5 1.35817 5.85817 1 6.3 1H9.7C10.1418 1 10.5 1.35817 10.5 1.8V3ZM6.5 3H9.5L9.5 2L6.5 2V3ZM4 4V14H12V4H4Z"
                fill="currentColor" fill-opacity="0.9"></path>
            </svg>
          </div>
        </div>
        <div class="setting-enumdef-adder">
          <svg width="2em" height="2em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            @click="handleAddEnumDef">
            <path d="M7.5 8.5H4.5V7.5H7.5V4.5H8.5V7.5H11.5V8.5H8.5V11.5H7.5V8.5Z" fill="currentColor"
              fill-opacity="0.9">
            </path>
            <path
              d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z"
              fill="currentColor" fill-opacity="0.9"></path>
          </svg>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Display from './components/Display'
import StatusBar from './components/StatusBar'

export default {
  name: 'App',
  components: {
    Display,
    StatusBar,
  },
  data() {
    return {
      drawer: false,
      enum_defs: [],
      selected_enum_def_index: -1,
    }
  },
  computed: {
    currentDescriptions: {
      get() {
        if (this.selected_enum_def_index === -1) return []
        if (this.enum_defs.length <= this.selected_enum_def_index) return []
        return this.enum_defs[this.selected_enum_def_index].descriptions
      }
    }
  },
  mounted() {
    this.enum_defs = window.utools.dbStorage.getItem("enum_defs") || []
  },
  methods: {
    handleDeleteEnumDef(index) {
      this.$confirm("确定删除 " + this.enum_defs[index].name + " ？", "确认", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (index === this.selected_enum_def_index) {
          this.selected_enum_def_index = -1
        }
        if (index < this.selected_enum_def_index) {
          this.selected_enum_def_index -= 1
        }
        this.enum_defs.splice(index, 1)
        window.utools.dbStorage.setItem("enum_defs", this.enum_defs)
      })
    },
    async handleAddEnumDef() {
      let name = ''
      let value = ''
      try {
        name = await this.$prompt('输入枚举名', '添加', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        try {
          value = await this.$prompt('输入枚举值，英文逗号分隔', '添加', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            inputPlaceholder: '示例：比特位1,比特位2,比特位3'
          })
          this.enum_defs.push({
            name: name.value,
            descriptions: value.value.split(','),
          })
          window.utools.dbStorage.setItem("enum_defs", this.enum_defs)
        } catch {
          console.log()
        }
      } catch {
        console.log()
      }
    }
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow-x: hidden;
}

#app {
  margin: 0;
  position: absolute;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
}

.setting-drawer {
  margin-right: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.setting-enumdef-list-item {
  margin: 10px;

  span {
    user-select: none;
  }

  svg {
    float: right;
    cursor: pointer;
  }
}

.setting-enumdef-adder {
  margin-top: auto;

  svg {
    margin: 1em;
    float: right;
    cursor: pointer;
  }
}
</style>
