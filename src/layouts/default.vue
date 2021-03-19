<template>
  <div
    ref="layout"
    class="layout"
    :class="layoutClass"
    @dragenter="onGlobalDragEnter"
    @dragover="onGlobalDragOver"
    @dragleave="onGlobalDragLeave"
    @drop="onGlobalDrop">
    <!-- Title bar -->
    <Titlebar />

    <!-- Navigation -->
    <Navbar />

    <!-- Menu -->
    <Menubar />

    <!-- Queue -->
    <QueueMenu />

    <!-- Content -->
    <div id="layout-content" class="layout__content">
      <div class="container h-full">
        <nuxt />
      </div>
    </div>

    <!-- Dragging -->
    <div class="layout__dropzone">
      <h2>Drop the dream here!</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { UploadMixin } from '~/mixins'

export default {

  mixins: [UploadMixin],
  middleware: ['wizard'],

  computed: {
    layoutClass() {
      return {
        'layout--dragging': this.isDragging,
        'layout--left-queue': this.$settings.app.queuePosition === 'left',
        'layout--trypophobia': this.$settings.app.trypophobiaMode,
        ...this.globalLayoutClass,
      }
    },

    ...mapState({
      globalLayoutClass: (state) => state.app.layoutClass,
      dragDropEnabled: (state) => state.app.dragDropEnabled,
    }),
  },

  mounted() {
    this.$router.afterEach(() => {
      this.$store.commit('app/clearLayoutClass')
      this.$store.commit('app/setDragDropEnabled', true)
    })
  },

  methods: {
    onGlobalDragEnter(event) {
      if (!this.dragDropEnabled) {
        return
      }

      this.onDragEnter(event)
    },

    onGlobalDragLeave() {
      if (!this.dragDropEnabled) {
        return
      }

      this.onDragLeave()
    },

    onGlobalDragOver(event) {
      if (!this.dragDropEnabled) {
        return
      }

      this.onDragOver(event)
    },

    onGlobalDrop(event) {
      if (!this.dragDropEnabled) {
        return
      }

      this.onDrop(event)
    },
  },
}
</script>

<style lang="scss" scoped>
.layout {
  @apply h-full;

  display: grid;
  grid-template-areas: 'title title title' 'nav nav nav' 'menu content queue';
  grid-template-columns: 300px 1fr 300px;
  grid-template-rows: 30px 50px 1fr;

  .queue {
    grid-area: queue;
    @apply border-l border-menus-light;
  }

  .menu {
    grid-area: menu;
    @apply border-r border-menus-light;
  }

  &.layout--left-queue {
    .queue {
      grid-area: menu;
      @apply border-r border-menus-light;
    }

    .menu {
      grid-area: queue;
      @apply border-l border-menus-light;
    }
  }

  &.layout--trypophobia {
    &::v-deep {
      .queue, .box__photo, .nudify__photo {
        background-image: none;
      }
    }
  }

  &.layout--dragging {
    .layout__dropzone {
      @apply flex opacity-100;
    }
  }

  &.layout--fullscreen {
    .layout__content {
      @apply p-0;
    }

    .container {
      @apply mx-0;
      max-width: initial;
    }
  }

  &.layout--wide {
    .layout__content {
      @apply px-6;
    }

    .container {
      @apply mx-0;
      max-width: initial;
    }
  }
}

.layout__topbar {
  height: 30px;
}

.layout__navbar {
  height: 50px;
}

.layout__content {
  @apply relative overflow-hidden overflow-y-auto;
  @apply py-6 px-9;
  grid-area: content;
  height: calc(100vh - 80px);
}

.layout__dropzone {
  @apply absolute left-0 right-0 top-0 bottom-0 z-50;
  @apply bg-menus-dark bg-opacity-90 items-center justify-center;
  @apply hidden opacity-0 pointer-events-none;
  backdrop-filter: blur(6px);
  transition: opacity 0.2s ease-in-out;
  will-change: opacity;

  h2 {
    @apply text-white font-bold text-3xl;
  }
}
</style>
