<script setup lang="ts">
import { ref, computed, Ref, reactive, toRaw } from '@vue/reactivity';
import Display from './components/Display.vue';
import StatusBar from './components/StatusBar.vue';
import EditableTable from './components/EditableTable.vue';
import { EnumberationDefinition } from './types/types';
import { ElMessageBox, FormInstance } from 'element-plus'
import { storage } from './utils/storage';
import { onMounted } from 'vue';

const drawerVisible = ref(false);
const enumDefs: Ref<EnumberationDefinition[]> = ref([]);
const selectedEnumDefIndex = ref(-1);

const editingIndex = ref(-1);
const enumDefEditorFormRef = ref<FormInstance>();
const enumDefEditorVisible = ref(false);
const enumDefEditorForm: EnumberationDefinition = reactive({
  name: '',
  descriptions: [],
});
const rules = reactive({
  name: [
    { required: true, message: '必须输入枚举名称', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '必须输入枚举值', trigger: 'blur' },
  ],
})
const currentDescriptions = computed(() => {
  if (selectedEnumDefIndex.value === -1) return [];
  if (enumDefs.value.length <= selectedEnumDefIndex.value) return [];
  return enumDefs.value[selectedEnumDefIndex.value].descriptions;
})

onMounted(() => {
  enumDefs.value = storage.getItem("enum_defs") || [];
})

const handleDeleteEnumDef = function (index: number) {
  ElMessageBox.confirm("确定删除 " + enumDefs.value[index].name + " ？", "确认", {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (index === selectedEnumDefIndex.value) {
      selectedEnumDefIndex.value = -1;
    }
    if (index < selectedEnumDefIndex.value) {
      selectedEnumDefIndex.value -= 1;
    }
    enumDefs.value.splice(index, 1);
    storage.setItem("enum_defs", toRaw(enumDefs.value));
  }).catch(() => { })
}

const handleAddEnumDef = function () {
  editingIndex.value = -1;
  enumDefEditorVisible.value = true;
  enumDefEditorForm.name = '';
  enumDefEditorForm.descriptions = [];
}

const handleEditEnumDef = function (index: number) {
  editingIndex.value = index;
  const item = enumDefs.value[index];
  Object.assign(enumDefEditorForm, item);
  enumDefEditorVisible.value = true;
}

const handleSetEnumDef = async function (formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (!valid) return;
    enumDefEditorVisible.value = false;
    if (editingIndex.value == -1) {
      enumDefs.value.push({ ...enumDefEditorForm });
    } else {
      enumDefs.value[editingIndex.value] = { ...enumDefEditorForm };
    }
    storage.setItem("enum_defs", JSON.parse(JSON.stringify(enumDefs.value)));
  })
}
</script>

<template>
  <Display :descriptions="currentDescriptions"></Display>
  <StatusBar :enumDefs="enumDefs" v-model="selectedEnumDefIndex" @setting="drawerVisible = true" />
  <el-drawer direction="ltr" v-model="drawerVisible" title="枚举定义列表">
    <div class="setting-drawer">
      <div class="setting-enumdef-list">
        <div class="setting-enumdef-list-item" v-for="(enum_def, index) in enumDefs" :key="enum_def.name">
          <span>{{ enum_def.name }} </span>
          <div>
            <el-icon class="setting-enumdef-list-item-operations">
              <Edit @click="handleEditEnumDef(index)" />
            </el-icon>
            <el-icon>
              <Delete @click="handleDeleteEnumDef(index)" />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="setting-enumdef-adder">
        <el-icon size="2em">
          <CirclePlus @click="handleAddEnumDef" />
        </el-icon>
      </div>
    </div>
  </el-drawer>
  <el-dialog v-model="enumDefEditorVisible" title="枚举值编辑">
    <el-form :model="enumDefEditorForm" :rules="rules" ref="enumDefEditorFormRef">
      <el-form-item label="枚举名" prop="name">
        <el-input v-model="enumDefEditorForm.name" />
      </el-form-item>
      <EditableTable v-model="enumDefEditorForm.descriptions"></EditableTable>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="enumDefEditorVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSetEnumDef(enumDefEditorFormRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

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
  margin-right: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.setting-enumdef-list-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 5px;

  span {
    user-select: none;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      overflow: visible;
      word-break: break-all;
    }
  }

  setting-enumdef-list-item-operations {
    width: 20%;
  }

  .el-icon {
    cursor: pointer;
  }
}

.setting-enumdef-adder {
  margin-top: auto;

  .el-icon {
    float: right;
    cursor: pointer;
  }
}
</style>
