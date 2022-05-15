<template>
  <div
    class="progress"
    :class="{ show: isShow, failed: isFailed }"
    :style="{ width: `${progress}%` }"
  ></div>
</template>

<script>
export default {
  name: 'TheTopProgressBar',
  data() {
    return {
      progress: 0,
      timer: null,
      isShow: false,
      isFailed: false,
    };
  },
  watch: {
    progress(v) {
      if (v === 100) {
        this.finish();
      }
    },
  },
  methods: {
    start() {
      this.isShow = true;
      this.progress = 0;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.progress += 10;
      }, 1000);
    },
    finish() {
      setTimeout(() => {
        this.isShow = false;
        this.progress = 0;
      }, 1000);
      this.progress = 100;
      clearInterval(this.timer);
    },
    fail() {
      this.isFailed = true;
      this.progress = 100;
      setTimeout(() => {
        this.isShow = false;
        this.isFailed = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0;
  opacity: 0;
  background-color: var(--blue);
  transition: all 0.2s linear 0.2s;
  z-index: 999999;
}

.progress.show {
  opacity: 1;
  /* transition: none; */
}

.progress.failed {
  background-color: #db3851;
}
</style>
