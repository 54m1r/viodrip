/*
 * Main file
 */

// Vue, Vue Router, App and Vuex store
import Vue from 'vue'
import router from './router'
// You can use the following starter router instead of the default one as a clean starting point
// import router from './router/starter'
import App from './App.vue'
import store from './store'

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io('', {
  path: '/roulette'
});

Vue.use(VueSocketIOExt, socket);

// Bootstrap Vue
import BootstrapVue from 'bootstrap-vue'

import moment from 'moment'

require('moment/locale/de');
moment.locale('de');

moment.locale('de', {
  calendar: {
    sameDay: '[Heute]',
    nextDay: '[Morgen]',
    nextWeek: 'dd',
    lastDay: '[Gestern]',
    lastWeek: '[Letzter] dd',
    sameElse: 'DD.MM.YYYYY'
  }
});

// Custom components
import BaseLayoutModifier from '@/components/BaseLayoutModifier'
import BaseBlock from '@/components/BaseBlock'
import BaseBackground from '@/components/BaseBackground'
import BasePageHeading from '@/components/BasePageHeading'
import BaseNavigation from '@/components/BaseNavigation'

// Custom directives
import clickRipple from '@/directives/clickRipple'
import toggleClass from '@/directives/toggleClass'

// Register global plugins
Vue.use(BootstrapVue)

Vue.prototype.moment = moment;

// Register global components
Vue.component(BaseLayoutModifier.name, BaseLayoutModifier)
Vue.component(BaseBlock.name, BaseBlock)
Vue.component(BaseBackground.name, BaseBackground)
Vue.component(BasePageHeading.name, BasePageHeading)
Vue.component(BaseNavigation.name, BaseNavigation)

// Register global directives
Vue.directive('click-ripple', clickRipple)
Vue.directive('toggle-class', toggleClass)

// Disable tip shown in dev console when in development mode
Vue.config.productionTip = false

// Craft new application
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
