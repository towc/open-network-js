// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SimpleMDE from 'simplemde'

import VueSimplemde from 'vue-simplemde'

import App from './App'
import router from './router'
import store from './store'

//import 'bulma/css/bulma.css'

// don't parse html
import marked from 'marked'

marked.setOptions({ sanitize: true });

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use( VueSimplemde );

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created() {
    this.$store.dispatch( 'populateAuthentication' );
  },
  template: '<App/>',
  components: { App }
});

