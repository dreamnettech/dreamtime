<template>
  <div class="nav">
    <div class="nav__left">
      <button v-tooltip="'Go back'" class="nav__item nav__item--button text-2xl" @click="$router.go(-1)">
        <font-awesome-icon icon="caret-left" />
      </button>

      <button v-tooltip="'Go forward'" class="nav__item nav__item--button text-2xl" @click="$router.go(1)">
        <font-awesome-icon icon="caret-right" />
      </button>
    </div>

    <div class="nav__center">
      <nuxt-link v-tooltip="'Open'" to="/" class="nav__item nav__item--link">
        <font-awesome-icon icon="upload" />
      </nuxt-link>

      <nuxt-link v-tooltip="'My Photos'" to="/photos" class="nav__item nav__item--link">
        <font-awesome-icon icon="images" />
      </nuxt-link>

      <!--
      <nuxt-link v-tooltip="'Community'" to="/social" class="nav__item nav__item--link">
        <font-awesome-icon icon="users" />
      </nuxt-link>
      -->

      <nuxt-link v-if="isDev"
                 v-tooltip="'Dev Garden'"
                 to="/garden"
                 class="nav__item nav__item--link">
        <font-awesome-icon icon="code" />
      </nuxt-link>
    </div>

    <div class="nav__right">
      <nuxt-link v-if="isBadTimeAvailable"
                 v-tooltip="'Bad Time Minigame 🎮'"
                 to="/games/badtime"
                 class="nav__item nav__item--button">
        <img src="~/assets/images/games/sans.png">
      </nuxt-link>

      <nuxt-link v-tooltip="'Status'" to="/status" class="nav__item nav__item--button">
        <font-awesome-icon icon="rocket" />
      </nuxt-link>

      <nuxt-link v-tooltip="'About'" to="/about" class="nav__item nav__item--button">
        <font-awesome-icon icon="info-circle" />
      </nuxt-link>

      <nuxt-link v-tooltip="'Settings'" to="/settings" class="nav__item nav__item--button">
        <font-awesome-icon icon="cog" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Avatars from '@dicebear/avatars'
import sprites from '@dicebear/avatars-jdenticon-sprites'
import { requirements, settings } from '~/modules/system'
import { events } from '~/modules'

export default {
  data: () => ({
    isBadTimeAvailable: settings.achievements.badtime,
  }),

  computed: {
    avatar() {
      const avatars = new Avatars(sprites, { base64: true })
      return avatars.create(settings.user)
    },

    canNudify() {
      return requirements.canNudify
    },

    isDev() {
      return process.env.NODE_ENV === 'development'
    },

    hasAlerts() {
      return requirements.hasAlerts
    },
  },

  mounted() {
    events.on('achievements.badtime', () => {
      this.isBadTimeAvailable = true
    })
  },

  methods: {
    createError() {
      throw new Error('UI TEST ERROR')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  @apply flex z-10;
  @apply h-full bg-menus border-b border-menus-dark px-3 shadow-lg;
  grid-area: nav;

  .nav__left,
  .nav__center,
  .nav__right {
    @apply flex-1 flex;
  }

  .nav__left {
    @apply items-center;
  }

  .nav__center {
    @apply justify-center;
  }

  .nav__right {
    @apply justify-end items-center;
  }
}

.nav__item {
  @apply flex items-center;

  img {
    @apply rounded-full;
    height: 30px;
  }

  &.nav__item--link {
    @apply justify-center border-b-2 border-transparent;
    width: 100px;

    .icon {
      @apply text-lg;
    }

    &:hover,
    &.nuxt-link-exact-active {
      @apply text-primary border-primary;
    }
  }

  &.nav__item--button {
    @apply justify-center;
    @apply rounded-full mx-2 outline-none;
    height: 40px;
    width: 40px;

    &:hover {
      @apply bg-menus-light text-primary;
    }

    &.nuxt-link-active {
      @apply text-primary;
    }

    img {
      height: 20px;
    }
  }
}

.layout__navbar {
  @apply flex bg-dark-500 z-10;
  @apply border-b border-dark-100;
  grid-area: nav;
  height: 50px;

  .navbar__left,
  .navbar__right {
    @apply flex items-center;
  }

  .navbar__left {
    @apply flex-1 mr-2;
  }

  .navbar__right {
    @apply justify-end;
  }

  .navbar__item {
    @apply mx-6 text-sm uppercase font-bold;

    &:hover {
      @apply text-white;
    }

    &:not(.navbar__item--home) {
      &.nuxt-link-active {
        @apply text-primary-500;
      }
    }

    &.navbar__item--home {
      &.nuxt-link-exact-active {
        @apply text-primary-500;
      }
    }
  }

  .navbar__icon {
    @apply mx-4;

    &:hover {
      @apply text-white;
    }

    &.nuxt-link-active {
      @apply text-primary-500;
    }
  }
}
</style>
