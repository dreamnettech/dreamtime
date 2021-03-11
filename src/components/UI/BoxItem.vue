<template>
  <div v-if="isVisible"
       class="box__item"
       :class="cssClass"
       @click="click">
    <!-- Icon -->
    <slot name="icon">
      <div v-if="icon" class="item__icon">
        <img v-if="isImageIcon" :src="icon">
        <font-awesome-icon v-else :icon="icon" />
      </div>
    </slot>

    <!-- Label & Description -->
    <div v-if="label" class="item__content">
      <span class="item__label" v-html="label" />

      <slot name="description">
        <span v-if="description"
              class="item__description"
              v-html="description" />
      </slot>
    </div>

    <!-- Actions -->
    <div v-if="$slots.default"
         class="item__action"
         :class="{ 'item__action--full': !hasIcon && !label }">
      <slot />
    </div>
  </div>
</template>

<script>
import { isNil, startsWith } from 'lodash'
import { dream } from '~/modules'

const { shell } = $provider.api

export default {
  props: {
    icon: {
      type: [String, Array],
      default: undefined,
    },

    label: {
      type: String,
      default: undefined,
    },

    description: {
      type: String,
      default: undefined,
    },

    version: {
      type: String,
      default: undefined,
    },

    href: {
      type: String,
      default: undefined,
    },

    isLink: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isVisible() {
      return isNil(this.version) || this.version === dream.version
    },

    hasIcon() {
      return !isNil(this.icon) || !isNil(this.$slots.icon)
    },

    isImageIcon() {
      return startsWith(this.icon, 'http') || startsWith(this.icon, '/')
    },

    cssClass() {
      return {
        'box__item--link': !isNil(this.href) || this.isLink,
      }
    },
  },

  methods: {
    click() {
      this.$emit('click')

      if (!isNil(this.href)) {
        if (startsWith(this.href, '/')) {
          this.$router.push(this.href)
        } else {
          consola.track('CLICK_LINK', { href: this.href })
          shell.openExternal(this.href)
        }
      }
    },

    isURL(str) {
      if (isNil(str)) {
        return false
      }
      if (startsWith(str, '~')) {
        return true
      }
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' // protocol
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
        + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
        + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
          + '(\\#[-a-z\\d_]*)?$',
        'i',
      ) // fragment locator
      return !!pattern.test(str)
    },
  },
}
</script>

<style lang="scss">
.box.box--items {
  &.box--items--horizontal {
    .box__content {
      @apply flex;
    }

    .box__item {
      @apply flex-1;
      @apply border-none;
    }
  }

  .box__content {
    @apply px-0;
  }

  .box__item {
    @apply flex px-4 py-2;
    min-height: 50px;
    //transition: all 0.2s ease-in-out;

    &.box__item--sub {
      @apply pl-8;
    }

    &.box__item--link {
      @apply cursor-pointer;

      &:hover {
        @apply bg-dark-800 text-white;
      }
    }

    &.box__item--active {
      @apply bg-dark-800 text-snow-light;
    }

    &:not(:last-child) {
      @apply border-b border-dark-300;
    }

    .item__icon {
      @apply mr-4 flex items-center justify-center text-2xl;
      min-width: 42px;
      width: 42px;
    }

    .item__content {
      @apply flex-1 flex flex-col justify-center;

      .item__label {
        @apply block font-semibold text-snow;
      }

      .item__description {
        @apply block text-sm;
      }
    }

    .item__action {
      //@apply flex items-center justify-center;

      .item__label {
        @apply block font-semibold text-sm text-snow;
      }

      &:not(.item__action--full) {
        @apply w-1/3 ml-4;
      }

      &.item__action--full {
        @apply flex-1;
      }
    }
  }
}
</style>
