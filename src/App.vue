<template>
  <div id="app">
    <Display :descriptions="currentDescriptions"></Display>
    <StatusBar :enum_defs="enum_defs" v-model="selected_enum_def" />
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
      enum_defs: [
        {
          name: 'extend_flag',
          descriptions: ['职业', '证件有效期', '地区，省级（手Q侧有使用）', '国家省市', '地址（手Q侧有使用）', '电话', '手机号', '邮件', '性别', '国籍', '证件类型', '证件号', '证件生效期', '姓名', '常住地址', '影印件地址']
        },
        {
          name: 'authen_channel_state',
          descriptions: ['身份文本信息公安部认证', '身份证影印件公安部认证', '支持实名认证的银行卡绑卡', '不支持实名认证的招行类银行绑卡', '通过移动运营商认证', '通过联通运营商认证', '通过电信运营商认证', '通过学历认证', '通过银联认证', '通过人脸识别', '通过微信验卡', 'QQ社交认证', '中铁认证', '微信社交认证', '银联二要素认证', '移民局认证', '微信人脸认证']
        }
      ],
      selected_enum_def: 'extend_flag',
    }
  },
  computed: {
    currentDescriptions: {
      get() {
        for (let i = 0; i < this.enum_defs.length; i++) {
          const ele = this.enum_defs[i]
          if (ele.name === this.selected_enum_def) {
            return ele.descriptions
          }
        }
        return []
      }
    }
  }
}
</script>

<style>
.body {
  overflow-x: hidden;
}
</style>
