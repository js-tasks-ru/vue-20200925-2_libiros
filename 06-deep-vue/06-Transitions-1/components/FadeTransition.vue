<template>
  <transition mode="out-in" v-bind="$attrs" v-on="$listeners" name="fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeTransition',
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
