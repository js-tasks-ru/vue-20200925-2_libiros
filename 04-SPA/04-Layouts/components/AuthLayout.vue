<template>
  <div class="page page_onboarding">
    <h2>{{ title }}</h2>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',

  props: {
    title: {
      type: String,
      default: 'Страница авторизации'
    }
  }
};
</script>

<style scoped>
.page.page_onboarding {
    max-width: 374px;
    width: 100%;
    margin: 0 auto;
}
</style>
