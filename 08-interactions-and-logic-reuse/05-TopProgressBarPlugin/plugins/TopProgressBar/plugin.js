import TopProgressBar from './index';
import TheTopProgressBar from './TheTopProgressBar';

export default {
  install(Vue, { router } = {}) {
    if (!TopProgressBar.instance) {
      const container = document.body.appendChild(
        document.createElement('div'),
      );
      TopProgressBar.instance = new Vue(TheTopProgressBar).$mount(container);
    }

    if (router) {
      router.beforeEach((to, from, next) => {
        TopProgressBar.start();
        next();
      });
      router.afterEach(() => {
        TopProgressBar.finish();
      });
      router.onError((err) => {
        TopProgressBar.fail();
        throw err;
      });
    }

    Vue.prototype.$progress = TopProgressBar;
  },
};
