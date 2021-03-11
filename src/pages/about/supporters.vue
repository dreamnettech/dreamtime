<template>
  <div class="project">
    <div class="project__buttons">
      <a v-for="(item, index) in supportButtons"
         :key="index"
         v-tooltip="item.label"
         class="button"
         :href="item.href"
         target="_blank">
        <span class="icon"><FontAwesomeIcon :icon="item.icon" /></span>
      </a>
    </div>

    <div class="project__content">
      <!-- Supporters -->
      <div class="box">
        <div class="box__header">
          <div class="left">
            <h1 class="title">
              Supporters
            </h1>
            <h2 class="subtitle">
              Wonderful people that without them this would not be possible.
            </h2>
          </div>
        </div>

        <div class="box__content">
          <!-- Remote navigation -->
          <MenuItem
            v-for="(item, index) in supporters"
            :key="index"
            :label="item.name"
            :description="item.description"
            :icon="item.icon"
            :class="item.role" />
        </div>
      </div>

      <!-- Sponsors -->
      <div class="box">
        <div class="box__header">
          <div class="left">
            <h1 class="title">
              Sponsors
            </h1>
            <h2 class="subtitle">
              Incredible services that support the project.
            </h2>
          </div>

          <div class="right">
            <a class="button" :href="sponsorURL" target="_blank">
              Sponsor
            </a>
          </div>
        </div>

        <div class="box__content">
          <!-- Remote navigation -->
          <MenuItem
            v-for="(item, index) in sponsors"
            :key="index"
            :label="item.name"
            :description="item.description"
            :icon="item.icon"
            :class="item.role" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    sponsors() {
      return this.$dreamtrack.get('sponsors', [])
    },

    supporters() {
      return this.$dreamtrack.get('supporters', [])
    },

    supportButtons() {
      return this.$community.data.support || []
    },

    supportURL() {
      return this.$dreamtrack.get('urls.support.main', 'https://www.patreon.com/dreamnet')
    },

    sponsorURL() {
      return this.$dreamtrack.get('urls.support.sponsor', 'https://www.patreon.com/join/dreamnet/checkout?rid=4426478')
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
    background-position: 200% 0%;
  }
}

.project__buttons {
  @apply mb-6 flex justify-center;
}

.project__content {
  .title {
    @apply text-white text-2xl;
  }

  &::v-deep {
    .is-gold .item__label {
      color: #d5ad6d;
    }

    .is-super-gold .item__label {
      @apply text-lg;

      background: #d5ad6d;
      background: linear-gradient(10deg,
  rgba(247, 202, 131) 0%,
  rgba(247, 202, 131) 26%,
  rgba(163, 126, 67, 1) 35%,
  rgba(145, 112, 59, 1) 45%,
  rgba(247, 202, 131)  61%,
  rgba(247, 202, 131) 100%);
      background-clip: text;
      background-position: 0% 0%;
      background-size: 200% 100%;
      color: #d5ad6d;
      -webkit-text-fill-color: transparent;

      animation-name: logoAnim;
      animation-timing-function: linear;
      animation-duration: 5s;
      animation-iteration-count: infinite;
    }

    .is-ultra-gold .item__label {
      @apply text-lg;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

      background: rgb(99, 66, 245);
      background: linear-gradient(10deg,
      rgba(99, 66, 245, 1) 0%,
      rgba(239, 125, 199, 1) 50%,
      rgba(99, 66, 245, 1) 100%);
      background-clip: text;
      background-position: 0% 0%;
      background-size: 200% 100%;
      -webkit-text-fill-color: transparent;

      animation-name: logoAnim;
      animation-timing-function: linear;
      animation-duration: 5s;
      animation-iteration-count: infinite;
    }
  }
}

.box__header {
  @apply grid grid-cols-4 gap-3;

  .left {
    @apply col-span-3;
  }

  .right {
    @apply flex justify-center items-center;
  }
}

.box__content {
  @apply overflow-y-auto;
  max-height: 500px;
}
</style>
