<template>
  <div class="community">
    <div class="community__header">
      <video src="~/assets/videos/dreamnet.mp4"
             autoplay
             muted
             loop />

      <div ref="intro"
           class="header__overlay">
        <div class="header__content">
          <div class="header__content__logo">
            <img src="~/assets/images/dreamnet.png">
          </div>

          <div class="header__content__body">
            <h1>{{ community.name }}</h1>
            <h2>{{ community.slogan }}</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="community__content content__body">
      <div class="community__content__left">
        <div
          v-for="(section, index) in community.sections"
          :key="index"
          class="box box--items">
          <div class="box__header">
            <h2 class="title">
              {{ section.title }}
            </h2>
          </div>

          <div v-if="typeof section.content === 'object'"
               class="box__content">
            <box-item
              v-for="(item, it) in section.content"
              :key="it"
              :label="item.label"
              :description="item.description"
              :icon="item.icon"
              :href="item.href"
              :version="item.version" />
          </div>
        </div>

        <p class="secret"
           @click.prevent="secretError">
          *
        </p>
      </div>

      <div class="community__content__right">
        <!-- News -->
        <app-news />
      </div>
    </div>
  </div>
</template>

<script>
import { isNil } from 'lodash'
import { tween, styler } from 'popmotion'
import { dreamtrack } from '~/modules/services'

export default {
  computed: {
    community() {
      return dreamtrack.get('community', {
        name: 'DreamNet',
        slogan: 'Adult entertainment and decentralized applications to combat censorship.',
        sections: [],
      })
    },
  },

  mounted() {
    setTimeout(() => {
      if (isNil(this.$refs.intro)) {
        return
      }

      const intro = styler(this.$refs.intro)

      tween({
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 1000,
      }).start((v) => intro.set(v))
    }, 1500)
  },

  methods: {
    secretError() {
      throw new Error('SECRET TEST ERROR')
    },
  },
}
</script>

<style lang="scss" scoped>
.community__header {
  @apply relative overflow-hidden;
  height: 200px;

  video {
    @apply absolute right-0 bottom-0 h-full w-full overflow-hidden;
    object-fit: cover;
  }

  .container {
    @apply flex items-center;
  }

  .header__overlay {
    @apply absolute h-full w-full;
    @apply flex items-center justify-center;
    @apply px-6 bg-black bg-opacity-80 opacity-0;
    backdrop-filter: blur(6px);
  }

  .header__content {
    @apply flex items-center;

    .header__content__logo {
      @apply mr-6;

      img {
        height: 100px;
      }
    }

    .header__content__body {
      h1 {
        @apply text-4xl text-white font-bold;
      }

      h2 {
        @apply text-xl;
      }
    }
  }
}

.community__content {
  @apply flex;

  .community__content__left {
    @apply w-1/4 mr-4;
  }

  .community__content__right {
    @apply flex-1 flex justify-center;
  }

  .community__donate-button {
    @apply w-full mb-6;
  }
}

.secret {
  @apply text-xs text-black cursor-pointer;
}
</style>
