<template>
  <div class="titlebar">
    <!-- Logo -->
    <div class="titlebar__logo">
      <span>{{ $dream.name }}</span>
      <span class="ml-1">{{ $dream.version }}</span>
    </div>

    <div class="titlebar__greetings">
      <span v-if="!isBadTime">{{ greetings }}</span>
      <span v-else class="badtime"><img src="~/assets/images/games/sans.png"> i don't like what you are doing.</span>
    </div>

    <div class="titlebar__empty" />

    <!-- Drag -->
    <div class="titlebar__drag" />

    <!-- Window Buttons -->
    <div class="titlebar__buttons">
      <button id="minimize"
              type="button"
              @click="minimize">
        <font-awesome-icon icon="minus" />
      </button>

      <button id="maximize"
              type="button"
              @click="maximize">
        <font-awesome-icon :icon="['far', 'square']" />
      </button>

      <button id="close"
              type="button"
              class="close"
              @click="close">
        <font-awesome-icon icon="times" />
      </button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

const { getCurrentWindow } = require('electron').remote

const { api } = $provider.util

export default {
  data: () => ({
    isBadTime: false,
  }),

  computed: {
    greetings() {
      const hours = dayjs().hour()

      if (hours >= 6 && hours <= 11) {
        return '☕ Good morning'
      }

      if (hours >= 12 && hours <= 19) {
        return '🌞 Good afternoon'
      }

      if (hours >= 0 && hours <= 5) {
        return '🐏 Sweet dreams'
      }

      return '🌛 Good night'
    },
  },

  mounted() {
    this.$router.afterEach((to) => {
      if (to.path === '/games/badtime') {
        this.isBadTime = true
      } else {
        this.isBadTime = false
      }
    })
  },

  methods: {
    minimize() {
      try {
        getCurrentWindow().minimize()
      } catch (error) {
        throw new Exception('There was a problem trying to minimize the window.', error)
      }
    },

    maximize() {
      try {
        getCurrentWindow().maximize()
      } catch (error) {
        throw new Exception('There was a problem trying to maximize the window.', error)
      }
    },

    close() {
      api.app.quit()
    },
  },
}
</script>

<style lang="scss" scoped>
@keyframes logoAnim {
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 100% 0%;
  }

  100% {
    background-position: 0% 0%;
  }
}

.titlebar {
  @apply flex gap-4 justify-end relative;
  @apply bg-black text-white;
  grid-area: title;
  height: 30px;
  z-index: 9999999;
}

.titlebar__logo {
  @apply flex justify-center items-center;
  @apply text-white text-sm font-bold px-6 select-none;

  animation-name: logoAnim;
  animation-timing-function: linear;
  animation-duration: 15s;
  animation-iteration-count: infinite;

  background: rgb(99, 66, 245);
  background: linear-gradient(40deg,
  rgba(99, 66, 245, 1) 0%,
  rgba(239, 125, 199, 1) 50%,
  rgba(99, 66, 245, 1) 100%);
  background-position: 0% 0%;
  background-size: 200% 100%;
}

.titlebar__greetings {
  @apply flex justify-center items-center;
  @apply text-white text-sm font-light select-none;

  img {
    height: 20px;
  }

  .badtime {
    @apply flex items-center font-bold;
    font-family: 'Comic Sans MS', serif;

    img {
      @apply mr-2;
    }
  }
}

.titlebar__stats {
}

.titlebar__empty {
  @apply flex-1;
}

.titlebar__drag {
  @apply absolute left-0 bottom-0 z-50;
  top: 5px;
  right: 150px;
  -webkit-app-region: drag;
}

.titlebar__buttons {
  @apply flex;

  button {
    @apply flex items-center justify-center outline-none;
    @apply text-xs;
    height: 30px;
    width: 50px;

    &:hover {
      @apply bg-dark-800;

      &.close {
        @apply bg-danger;
      }
    }
  }
}
</style>
