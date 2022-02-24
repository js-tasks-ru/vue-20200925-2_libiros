<template>
  <button @click="$emit('increment', increment_())">{{ count_ }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      count_: this.count,
    };
  },
  methods: {
    increment_() {
      this.count_ += 1;
      return this.count_;
    },
  },
  model: {
    count: {
      event: 'increment',
      prop: 'count',
    },
  },
  watch: {
    count(value) {
      this.count_ = value;
    },
  },
};
</script>

<style></style>
