<template>
  <component
    :is="tag"
    v-bind="$attrs"
    v-on="$listeners"
    class="button"
    :class="{ button_block: block }"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'button',
      validator(v) {
        return ['button', 'a', 'router-link'].includes(v);
      },
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
