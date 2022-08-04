<template>
    <div class="status-bar">
        <div class="setting-button" @click="$emit('onSetting')">
            <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.0002 8C11.0002 9.65685 9.65702 11 8.00017 11C6.34331 11 5.00017 9.65685 5.00017 8C5.00017 6.34315 6.34331 5 8.00017 5C9.65702 5 11.0002 6.34315 11.0002 8ZM10.0002 8C10.0002 6.89543 9.10474 6 8.00017 6C6.8956 6 6.00017 6.89543 6.00017 8C6.00017 9.10457 6.8956 10 8.00017 10C9.10474 10 10.0002 9.10457 10.0002 8Z"
                    fill="currentColor" fill-opacity="0.9"></path>
                <path
                    d="M8.00017 1.25L14.0623 4.625V11.375L8.00017 14.75L1.93799 11.375V4.625L8.00017 1.25ZM2.93799 5.2128V10.7872L8.00017 13.6055L13.0623 10.7872V5.2128L8.00017 2.39453L2.93799 5.2128Z"
                    fill="currentColor" fill-opacity="0.9"></path>
            </svg>
            <span>
                设置
            </span>
        </div>
        <div class="enum-chooser">
            <el-select v-model="selectedValIndex" size="mini">
                <el-option v-for="(enum_def, i) in enum_defs" :key="i" :label="enum_def.name" :value="i" />
            </el-select>
        </div>
    </div>
</template>
<script>
export default {
    name: 'StatusBar',
    props: {
        enum_defs: {
            type: Array
        },
        value: {
            type: Number
        },
    },
    computed: {
        selectedValIndex: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.status-bar {
    margin-top: auto;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
}

.setting-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 8px;
    margin-right: 8px;
    cursor: pointer;
    color: #808080;
}

.enum-chooser {
    margin-right:8px;
    select {
        font-size: 1em;
    }
}
</style>