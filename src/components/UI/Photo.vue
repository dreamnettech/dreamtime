<template>
  <div class="box photo">
    <div class="box__photo">
      <video v-if="file.isVideo"
             class="photo__video"
             :src="file.url"
             autoplay
             muted
             loop
             data-private
             @click="openPreview" />

      <div v-else
           class="photo__preview"
           :style="{ backgroundImage: `url('${file.url}')` }"
           data-private
           @click="openPreview" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openPreview() {
      this.file.openItem()
    },
  },
}
</script>

<style lang="scss" scoped>
.photo {
  @apply mb-0;

  &::v-deep {
    .box__photo {
      background-image: url('~@/assets/images/carbon-fibre-v2.png');
      will-change: transform;
      height: 300px;
    }
  }
}

.photo__preview {
  @apply absolute top-0 bottom-0 left-0 right-0 z-10;
  @apply bg-contain bg-no-repeat bg-center;
  cursor: zoom-in;
}

.photo__video {
  @apply h-full w-full overflow-hidden;
  cursor: zoom-in;
}
</style>
