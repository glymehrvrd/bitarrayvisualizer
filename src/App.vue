<script setup lang="ts">
import { ref, computed, Ref, reactive } from '@vue/reactivity';
import Display from './components/Display.vue';
import StatusBar from './components/StatusBar.vue';
import type { EnumberationDefinition } from './types/types';
import { ElMessageBox, FormInstance } from 'element-plus'
import { storage } from './utils/storage';
import { onMounted } from 'vue';

const drawerVisible = ref(false);
const enumDefs: Ref<EnumberationDefinition[]> = ref([]);
const selectedEnumDefIndex = ref(-1);

const enumDefEditorFormRef = ref<FormInstance>();
const enumDefEditorVisible = ref(false);
const enumDefEditorForm = reactive({
  'name': '',
  'description': '',
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
  enumDefs.value = storage.getItem("enumDefs") || [];
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
    storage.setItem("enumDefs", enumDefs.value);
  })
}

const handleEditEnumDef = function (index: number) {
  const item = enumDefs.value[index];
  enumDefEditorForm.name = item.name;
  enumDefEditorForm.description = item.descriptions.join(',');
  enumDefEditorVisible.value = true;
}

const handleAddEnumDef = async function (formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (!valid) return;
    enumDefEditorVisible.value = false;
    enumDefs.value.push({
      name: enumDefEditorForm.name,
      descriptions: enumDefEditorForm.description.split(','),
    });
    storage.setItem("enumDefs", enumDefs.value);
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
          <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            @click="handleDeleteEnumDef(index)">
            <path d="M6 12V6H7V12H6Z" fill="currentColor" fill-opacity="0.9"></path>
            <path d="M9 6V12H10V6H9Z" fill="currentColor" fill-opacity="0.9"></path>
            <path
              d="M10.5 3H14V4H13V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V4H2V3H5.5L5.5 1.8C5.5 1.35817 5.85817 1 6.3 1H9.7C10.1418 1 10.5 1.35817 10.5 1.8V3ZM6.5 3H9.5L9.5 2L6.5 2V3ZM4 4V14H12V4H4Z"
              fill="currentColor" fill-opacity="0.9"></path>
          </svg>
          <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            @click="handleEditEnumDef(index)">
            <g opacity=" 0.9">
              <path d="M14.1321 4.95049L10.8888 1.70711L11.5959 1L14.8393 4.24338L14.1321 4.95049Z" fill="currentColor"
                fill-opacity="0.9"></path>
              <path
                d="M5.97196 13.1108L2.359 13.8334C2.14909 13.8754 1.96401 13.6903 2.00599 13.4804L2.72858 9.86742L10.0262 2.56982L13.2696 5.8132L5.97196 13.1108ZM11.8554 5.8132L10.0262 3.98403L3.64979 10.3604L3.19249 12.6469L5.47895 12.1896L11.8554 5.8132Z"
                fill="currentColor" fill-opacity="0.9"></path>
              <path d="M15 11H11V12H15V11Z" fill="currentColor" fill-opacity="0.9"></path>
              <path d="M15 13H8.5V14H15V13Z" fill="currentColor" fill-opacity="0.9"></path>
            </g>
          </svg>
        </div>
      </div>
      <div class="setting-enumdef-adder">
        <svg width="2em" height="2em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
          @click="enumDefEditorVisible = true">
          <path d="M7.5 8.5H4.5V7.5H7.5V4.5H8.5V7.5H11.5V8.5H8.5V11.5H7.5V8.5Z" fill="currentColor" fill-opacity="0.9">
          </path>
          <path
            d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z"
            fill="currentColor" fill-opacity="0.9"></path>
        </svg>
      </div>
    </div>
  </el-drawer>
  <el-dialog v-model="enumDefEditorVisible" title="Shipping address">
    <el-form :model="enumDefEditorForm" :rules="rules" ref="enumDefEditorFormRef">
      <el-form-item label="枚举名" prop="name">
        <el-input v-model="enumDefEditorForm.name" />
      </el-form-item>
      <el-form-item label="枚举值，英文逗号分隔" prop="description">
        <el-input v-model="enumDefEditorForm.description" placeholder="示例：比特位1,比特位2,比特位3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="enumDefEditorVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddEnumDef(enumDefEditorFormRef)">确认</el-button>
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
