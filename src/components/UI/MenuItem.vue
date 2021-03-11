<template>
  <component :is="component"
             :to="href"
             class="item"
             :class="cssClass"
             @click="click">
    <!-- Icon -->
    <slot name="icon">
      <div v-if="icon" class="item__icon">
        <img v-if="isImageIcon" :src="icon">
        <font-awesome-icon v-else :icon="icon" />
      </div>
    </slot>

    <!-- Title & Description -->
    <div v-if="label" class="item__label">
      <div class="item__title">
        <span v-html="label" />
        <AppTip v-if="tooltip" :tooltip="prettyTooltip" />
      </div>

      <slot name="description">
        <span v-if="description" class="item__description" v-html="description" />
      </slot>
    </div>

    <!-- Action -->
    <div v-if="$slots.default" class="item__action" :class="actionClass">
      <slot />
    </div>
  </component>
</template>

<script>
import { isNil, startsWith } from 'lodash'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

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

    tooltip: {
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

    actionClass: {
      type: [String, Object, Array],
      default: '',
    },
  },

  computed: {
    hasIcon() {
      return !isNil(this.icon) || !isNil(this.$slots.icon)
    },

    isImageIcon() {
      return startsWith(this.icon, 'http') || startsWith(this.icon, '/')
    },

    isBlackImageIcon() {
      return this.isImageIcon && (this.icon.includes('simple-icons') || this.icon.includes('4cdn.org'))
    },

    cssClass() {
      return {
        'item--link': !isNil(this.href) || this.isLink,
        'item--black-icon': this.isBlackImageIcon,
      }
    },

    component() {
      if (!isNil(this.href)) {
        if (startsWith(this.href, '/')) {
          return 'nuxt-link'
        }
      }

      return 'div'
    },

    prettyTooltip() {
      return md.render(this.tooltip)
    },
  },

  methods: {
    click() {
      this.$emit('click')

      if (!isNil(this.href)) {
        if (!startsWith(this.href, '/')) {
          consola.track('CLICK_LINK', { href: this.href })
          shell.openExternal(this.href)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  @apply flex items-center;
  @include transition('background-color');
  min-height: 50px;

  &:not(:last-child) {
    @apply mb-3;
  }

  &.item--active,
  &.nuxt-link-exact-active,
  &.item--link:hover {
    @apply bg-menus-light;

    .item__icon, .item__title {
      @apply text-snow-lighter;
    }
  }

  &.item--link {
    @apply rounded cursor-pointer;
    @include transition('background-color, color');
  }
}

.item--black-icon {
  .item__icon img {
    filter: invert(100%) sepia(11%) saturate(0%) hue-rotate(146deg) brightness(111%) contrast(101%);
  }
}

.item__icon {
  @apply mr-2 flex items-center justify-center;
  @apply text-2xl;
  width: 42px;
  min-width: 42px;

  img {
    width: 24px;
    height: 24px;
  }
}

.item__label {
  @apply flex-1 flex flex-col justify-center;
  @apply text-snow; // Required in case MenuItem is used without Box

  &:not(:last-child) {
    @apply mr-6;
  }

  .item__title {
    @apply block font-title font-bold;
  }

  &::v-deep {
    .tip {
      @apply ml-1;
    }
  }

  .item__description {
    @apply block text-sm text-snow-darker;
  }
}

.item__action {
  @apply flex-1;

  &.item__action--center {
    @apply flex justify-center items-center;
  }
}
</style>
