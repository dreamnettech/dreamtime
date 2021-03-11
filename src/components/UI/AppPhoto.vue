<template>
  <figure class="photo"
          :class="{'photo--hover': hover}">
    <img :src="src">

    <p v-if="$slots.default"
       class="photo__label">
      <slot />
    </p>
  </figure>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },

    hover: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.photo {
  @apply relative flex flex-col z-50;
  box-sizing: content-box;
  //transition: all 0.2s ease-in-out;

  &.photo--hover:hover {
    transform: scale(1.5);

    img {
      @apply rounded;
    }
  }

  img {
    @apply w-full rounded-t shadow-md;
    height: auto;
    max-height: 300px;
  }

  .photo__label {
    @apply p-2 rounded-b bg-dark-500;
    @apply text-snow-light text-sm font-semibold text-center;
  }
}
</style>
