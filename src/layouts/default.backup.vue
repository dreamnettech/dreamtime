<template>
  <div
    class="layout"
    :class="{
      'layout--dragging': isDragging,
      'layout--left-queue': $settings.app.queuePosition === 'left'
    }"
    @dragenter="onDragEnter"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop">
    <!-- Window Buttons -->
    <LayoutTopbar />

    <!-- Navigation -->
    <LayoutNavbar />

    <!-- Queue -->
    <QueueBar />

    <!-- Content -->
    <div id="layout-content"
         class="layout__content">
      <nuxt />
    </div>

    <!-- Dragging -->
    <div class="layout__dropzone">
      <h2>Drop the dream here!</h2>
    </div>
  </div>
</template>

<script>
import { UploadMixin } from '~/mixins'

export default {

  mixins: [UploadMixin],
  middleware: ['wizard'],
}
</script>

<style lang="scss" scoped>
.layout {
  @apply h-full;

  display: grid;
  grid-template-areas: 'topbar topbar topbar' 'navbar navbar navbar' 'content content queuebar';
  grid-template-columns: 250px 1fr 250px;
  grid-template-rows: 30px 50px 1fr;

  &.layout--left-queue {
    grid-template-areas: 'topbar topbar topbar' 'navbar navbar navbar' 'queuebar content content';

    .layout__jobbar {
      @apply border-l-0 border-r;
    }
  }

  &.layout--dragging {
    .layout__dropzone {
      @apply flex opacity-100;
    }
  }

  .layout__topbar {
    grid-area: topbar;
  }

  .layout__navbar {
    grid-area: navbar;
  }

  .layout__jobbar {
    grid-area: queuebar;
  }

  .layout__content {
    @apply relative overflow-hidden overflow-y-auto;
    grid-area: content;
    height: calc(100vh - 80px);
  }

  .layout__dropzone {
    @apply absolute left-0 right-0 top-0 bottom-0 z-50;
    @apply hidden opacity-0 pointer-events-none;
    @apply bg-dark-900 bg-opacity-70 items-center justify-center;
    backdrop-filter: blur(6px);
    transition: opacity 0.2s ease-in-out;
    will-change: opacity;

    h2 {
      @apply text-white font-bold text-3xl;
    }
  }
}
</style>
