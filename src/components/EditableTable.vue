<script setup lang="ts">
import { computed, Ref, ref } from '@vue/reactivity';
import { rowContextKey } from 'element-plus';

const props = defineProps({
    modelValue: {
        type: Array<String>,
        default: [],
    },
});

const emit = defineEmits(['update:modelValue', 'update']);

interface TableColumn {
    nth: string,
    description: string,
    value: string,
}
const tableData = computed(() => {
    let result: TableColumn[] = [];
    for (let i = 0; i < props.modelValue.length; i++) {
        const desc = props.modelValue[i];
        result.push({
            nth: i.toString(),
            description: desc.toString(),
            value: (1 << i).toString(16),
        })
    }
    return result;
})

const enumDefBatchAdderVisible = ref(false);
const batchAddEnumDefValue = ref("");
const handleBatchAddEnumDef = () => {
    props.modelValue.push(...batchAddEnumDefValue.value.trim().split('\n'));
    enumDefBatchAdderVisible.value = false;
}

let cellValue = ref('');
let editingRow = ref(false);
const handleEditCell = (row: any, column: any, cell: any, event: any) => {
    if (editingRow.value) return;
    if (column.label != '描述') return;
    cellValue.value = row.description;
    editingRow.value = true;
    row.editing = true;
}
const changeDescription = (scope: any) => {
    props.modelValue[scope.$index] = cellValue.value;
    editingRow.value = false;
    scope.row.editing = false;
}
</script>

<template>
    <el-table :data="tableData" style="width: 100%" @cell-dblclick="handleEditCell">
        <el-table-column prop="nth" label="第n位">
            <template #default="scope">
                {{scope.$index}}
            </template>
        </el-table-column>
        <el-table-column label="描述">
            <template #default="scope">
                <el-input v-if="scope.row.editing" size="small" v-model="cellValue" @blur="changeDescription(scope)">
                </el-input>
                <span v-else>{{scope.row.description}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="value" label="枚举值" />
    </el-table>
    <el-button link @click="modelValue.push('')">添加</el-button>
    <el-button link @click="enumDefBatchAdderVisible = true">批量添加</el-button>
    <el-dialog v-model="enumDefBatchAdderVisible" title="枚举值批量添加">
        <el-input v-model="batchAddEnumDefValue" :autosize="{ minRows: 5 }" type="textarea"
            placeholder="枚举值列表, 一行一个, 自动从最高位开始添加" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="enumDefBatchAdderVisible = false">取消</el-button>
                <el-button type="primary" @click="handleBatchAddEnumDef">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>

</style>