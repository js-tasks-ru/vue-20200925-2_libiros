<template>
  <div class="form-group" :class="classObject">
    <label v-if="label" class="form-label">{{ label }}</label>
    <!-- <input /> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  data: function () {
    return {
      classObject: {
        'form-group_inline': this.label,
      },
    };
  },
  props: {
    inline: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
  margin-left: 16px;
}

.form-label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
</style>
