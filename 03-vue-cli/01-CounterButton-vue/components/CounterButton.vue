<template>
  <div>
    <button @click="increment()" type="button">{{ count }}</button>
  </div>
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
  model: {
    prop: 'count',
    event: 'increment',
  },
  methods: {
    increment() {
      this.$emit('increment', this.count + 1);
    },
  },
};
</script>

<style></style>
