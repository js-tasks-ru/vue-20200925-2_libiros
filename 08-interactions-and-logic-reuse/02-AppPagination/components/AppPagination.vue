<template>
  <div>
    <!-- Решение -->
    <template v-for="item in itemsPerPage">
      <slot name="default" :item="item" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    page: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
    items: {
      type: Array,
    },
  },

  computed: {
    itemsPerPage() {
      return this.items.slice(
        this.perPage * (this.page - 1),
        this.perPage * this.page,
      );
    },
  },
};
</script>

<style></style>
