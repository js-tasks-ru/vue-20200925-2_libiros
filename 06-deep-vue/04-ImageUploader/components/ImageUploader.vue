<template>
  <div class="image-uploader">
    <label
      @click="deleteImage($event)"
      class="image-uploader__preview"
      :class="status === 'loading' ? 'image-uploader__preview-loading' : ''"
      :style="bg"
    >
      <span>{{ statusText }}</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="uploadImage($event)"
        ref="input"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',
  props: {
    imageId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      status: this.imageId ? 'uploaded' : 'empty',
    };
  },
  computed: {
    statusText() {
      let text;
      switch (this.status) {
        case 'uploaded':
          text = 'Удалить изображение';
          break;
        case 'empty':
          text = 'Загрузить изображение';
          break;
        case 'loading':
          text = 'Загрузка...';
          break;
      }
      return text;
    },
    bg() {
      return ImageService.getImageURL(this.imageId)
        ? { '--bg-image': `url(${ImageService.getImageURL(this.imageId)})` }
        : false;
    },
  },
  model: {
    prop: 'imageId',
    event: 'change',
  },
  watch: {
    imageId(v) {
      this.status = v ? 'uploaded' : 'empty';
    },
  },
  methods: {
    deleteImage(e) {
      if (this.status != 'uploaded') return;
      e.preventDefault();
      this.$emit('change', null);
      this.$refs.input.value = null;
    },
    async uploadImage(e) {
      this.status = 'loading';
      let file = e.target.files[0];
      console.log(file);
      const { id } = await ImageService.uploadImage(file);
      this.$emit('change', id);
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
