<template>
  <div class="meetups-list">
    <ul>
      <li v-for="item in items" :key="item.id">
        <slot name="default" :item="item" />
      </li>
    </ul>
    <!-- Требуется scoped-slot для каждого элемента списка -->
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: {
    items: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.meetups-list ul {
  padding: 0;
}
.meetups-list li {
  list-style: none;
}
</style>
