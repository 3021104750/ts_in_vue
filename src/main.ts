import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import {
  Button,
  Input,
  Select,
  Option,
  Menu,
  Submenu,
  MenuItem,
  Collapse,
  CollapseItem,
  Form,
  FormItem,
  MessageBox,
  Message,
  Notification,
  Tag,
  Empty,
  Badge
} from 'element-ui';

Vue.use(Button)
  .use(Input)
  .use(Select)
  .use(Option)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Form)
  .use(FormItem)
  .use(Tag)
  .use(Empty)
  .use(Badge);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
