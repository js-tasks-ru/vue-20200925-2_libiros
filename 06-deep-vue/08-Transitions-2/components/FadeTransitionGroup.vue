<script>
function cloneVNode(vnode, constructor) {
  const cloned = new constructor(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory,
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}

export default {
  name: 'FadeTransitionGroup',
  render(h) {
    let transitionGroupElement = h(
      'transition-group',
      { attrs: { name: 'fade-list', ...this.$attrs } },
      this.$slots.default,
    );
    let VNode = transitionGroupElement.__proto__.constructor;
    let transitionGroup = cloneVNode(transitionGroupElement, VNode);
    let slots_ = transitionGroup.context.$slots.default;

    for (let slot of slots_) {
      slot.data.staticClass = slot.data.staticClass
        ? slot.data.staticClass + ' fade-list-item'
        : 'fade-list-item';
    }
    transitionGroup.data.staticClass = transitionGroup.data.staticClass
      ? transitionGroup.data.staticClass + ' fade-list'
      : 'fade-list';
    return transitionGroup;
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
