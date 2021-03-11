<template>
  <section class="header">
    <div class="header__left">
      <slot />
    </div>

    <div v-if="this.$slots.center" class="header__center">
      <slot name="center" />
    </div>

    <div v-if="this.$slots.right" class="header__right">
      <slot name="right" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.header {
  @apply flex mb-6;

  &::v-deep {
    .title {
      @apply text-lg font-title font-bold text-snow-lighter;

      .icon {
        @apply mr-2;
      }
    }

    .subtitle {
      @apply font-title font-light text-snow-darker;
    }

    .tip {
      @apply ml-2;
    }
  }
}

.header__left {
  @apply flex-1 flex flex-col justify-center;

  &:not(:last-child) {
    @apply mr-3;
  }
}
</style>
