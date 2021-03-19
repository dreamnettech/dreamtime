<template>
  <div class="photo" :class="photoClass">
    <NudifyPhotoPreview :photo="photo" :live="true" :autoplay="false" />

    <div class="photo__content">
      <div class="photo__content__actions">
        <span v-show="photo.running || photo.finished">{{ photo.timer.duration }}s</span>

        <button v-tooltip="'Photo Panel'" @click="open">
          <font-awesome-icon icon="tools" />
        </button>

        <button v-show="!photo.running && !photo.waiting && !photo.withCustomMasks" v-tooltip="'Add to queue'" @click="add">
          <font-awesome-icon icon="play" />
        </button>

        <button v-show="photo.waiting" v-tooltip="'Cancel'" @click="cancel">
          <font-awesome-icon icon="sign-out-alt" />
        </button>

        <button v-show="photo.running" v-tooltip="'Stop'" @click="stop">
          <font-awesome-icon icon="stop" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },

  computed: {
    photoClass() {
      return {
        'photo--running': this.photo.running,
        'photo--failed': this.photo.failed,
      }
    },
  },

  methods: {
    open() {
      this.$router.push(`/nudify/${this.photo.id}`)
    },

    add() {
      this.photo.add()
    },

    cancel() {
      this.photo.cancel()
    },

    stop() {
      this.photo.cancel()
    },
  },
}
</script>

<style lang="scss" scoped>
.photo {
  @apply relative border-2 border-transparent;
  will-change: transform;

  &.photo--running {
    @apply border-primary;
  }

  &.photo--failed {
    @apply border-danger;
  }

  &:hover {
    .photo__content {
      @apply opacity-100;
    }
  }
}

.photo__content {
  @apply absolute top-0 bottom-0 left-0 right-0 z-30;
  @apply flex justify-center items-center bg-menus-dark bg-opacity-80 opacity-0;
  backdrop-filter: blur(4px);
  transition: opacity 0.1s linear;
}

.photo__content__actions {
  @include centered();
  @apply flex-1;

  span,
  button {
    @apply flex-1;
  }

  span {
    @include centered();
    @apply text-white font-semibold;
  }

  button {
    @apply outline-none text-xl;

    &:hover {
      @apply text-primary;
    }
  }
}
</style>
