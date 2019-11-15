import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './../node_modules/bulma/css/bulma.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import vuetify from '@/plugins/vuetify'; // path to vuetify export

Vue.config.productionTip = false;
Vue.use(vuetify);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount('#app');
