<template>
  <div class="container">
    <meetups-view v-bind.sync="queryParams" />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const defaultParams = {
  view: 'list',
  date: 'all',
  participation: 'all',
  search: '',
};

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },
  data() {
    return {
      queryParams: { ...defaultParams },
    };
  },
  watch: {
    $route: {
      handler(val) {
        this.queryParams = Object.assign({}, defaultParams, val.query);
      },
      deep: true,
      immediate: true,
    },
    queryParams: {
      deep: true,
      handler(v) {
        const route = { query: Object.assign({}, v) };

        for (let item in route.query) {
          if (route.query[item] === defaultParams[item]) {
            delete route.query[item];
          }
        }
        // PUSH выбран затем ,чтобы можно было откатываться назад кнопкой "назад" в браузере
        this.$router.push(route).catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      },
    },
  },
};
</script>

<style scoped></style>
