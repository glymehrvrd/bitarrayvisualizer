import Vue from 'vue'
import { Drawer, Option, Select, MessageBox } from 'element-ui';
import App from './App.vue'

Vue.use(Drawer)
Vue.use(Option)
Vue.use(Select)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
