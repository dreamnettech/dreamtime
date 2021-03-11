<template>
  <div class="stats">
    <div v-if="system && system.utilizationMemory"
         v-tooltip="'RAM Usage.'"
         class="device"
         :class="{ 'device--danger': system.utilizationMemory > 80 }">
      <FontAwesomeIcon icon="memory" />
      {{ system.utilizationMemory }}%
    </div>

    <div v-if="system && system.utilizationCpu"
         v-tooltip="'CPU Usage.'"
         class="device">
      <FontAwesomeIcon icon="microchip" />
      {{ system.utilizationCpu }}%
    </div>

    <div v-if="gpu && gpu.utilizationMemory"
         v-tooltip="'VRAM Usage.'"
         class="device"
         :class="{ 'device--danger': gpu.utilizationMemory > 80 }">
      <FontAwesomeIcon icon="desktop" />
      {{ gpu.utilizationMemory }}%
    </div>

    <div v-if="gpu && gpu.utilizationGpu"
         v-tooltip="'GPU Usage.'"
         class="device">
      <FontAwesomeIcon icon="running" />
      {{ gpu.utilizationGpu }}%
    </div>
  </div>
</template>

<script>
const { system, settings } = $provider

export default {
  data: () => ({
    gpuEvents: null,
    systemEvents: null,

    gpu: null,
    system: null,
  }),

  mounted() {
    if (settings.payload.preferences.advanced.device === 'GPU') {
      this.gpuEvents = system.observe('gpu', 1500)
      this.gpuEvents.on('change', this.onGpu.bind(this))
    }

    this.systemEvents = system.observe('system', 1500)
    this.systemEvents.on('change', this.onSystem.bind(this))
  },

  beforeDestroy() {
    if (this.gpuEvents) {
      this.gpuEvents.emit('stop')
    }

    if (this.systemEvents) {
      this.systemEvents.emit('stop')
    }
  },

  methods: {
    onGpu(data) {
      this.gpu = data
    },
    onSystem(data) {
      this.system = data
    },
  },
}
</script>

<style lang="scss" scoped>
.stats {
  @apply flex gap-4 justify-center items-center;
  @apply p-3 bg-menus-light;
}

.device {
  @apply flex-1 text-sm text-center select-none font-semibold;
  cursor: help;
  transition: color 0.1s linear;

  &.device--danger {
    @apply text-danger;
  }
}
</style>
