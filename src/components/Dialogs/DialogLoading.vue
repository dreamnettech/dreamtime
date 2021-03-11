<template>
  <dialog ref="dialog" class="dialog">
    <AppBox>
      <div class="loading">
        <div class="sk-chase">
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
          <div class="sk-chase-dot" />
        </div>
      </div>

      <div class="body">
        <h2 class="title">
          {{ title }}
        </h2>

        <h3 v-if="subtitle" class="subtitle">
          {{ subtitle }}
        </h3>
      </div>

      <template #footer>
        <div class="box__footer buttons flex-end">
          <button v-if="allowClose" class="button button--danger" @click="close">
            Close
          </button>
        </div>
      </template>
    </AppBox>
  </dialog>
</template>

<script>
import { throttle } from 'lodash'
import { File } from '~/modules'
import { Nudify } from '~/modules/nudify'

export default {
  props: {
    title: {
      type: String,
      default: 'Loading',
    },
    subtitle: {
      type: String,
      default: null,
    },
    allowClose: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: -1,
    },
  },

  data: () => ({
    timeoutIndex: -1,
  }),

  methods: {
    open() {
      this.$refs.dialog.showModal()

      if (this.timeout > -1) {
        this.timeoutIndex = setTimeout(this.close.bind(this), this.timeout)
      }
    },

    close() {
      this.$refs.dialog.close()

      clearTimeout(this.timeoutIndex)
      this.timeoutIndex = -1
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  width: 500px;
}

.loading {
  @apply flex justify-center mb-6;
}

.body {
  @apply text-center mb-6;

  .title {
    @apply text-snow-lighter text-xl font-bold;
  }

  .subtitle {
    @apply text-snow-darker font-light;
  }
}

.progress {
  progress {
    @apply block w-full mb-3;
    @apply border-0 bg-menus-dark;
    height: 18px;
    border-radius: 9px;

    &::-webkit-progress-bar {
      @apply bg-background;
      border-radius: 9px;
    }

    &::-webkit-progress-value {
      @apply bg-primary;
      border-radius: 9px;
    }
  }
}

.progress__text {
  @apply text-center;
}
</style>

<style scoped>
.sk-chase {
  width: 60px;
  height: 60px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2.0s infinite ease-in-out both;
}

.sk-chase-dot:before {
  @apply bg-primary;
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); }
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  } 100%, 0% {
    transform: scale(1.0);
  }
}
</style>
