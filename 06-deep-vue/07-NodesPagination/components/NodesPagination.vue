<script>
export default {
  name: 'NodesPagination',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
  render: function (createElement) {
    if (this.$slots.default) {
      return createElement(
        'div',
        this.$slots.default.slice(
          this.perPage * (this.page - 1),
          this.perPage * this.page,
        ),
      );
    } else {
      return createElement('div');
    }
  },
};
</script>

<style scoped></style>
