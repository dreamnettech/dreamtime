<template>
  <!-- Offline mode -->
  <MenuItem
    v-if="!updater.enabled"
    v-tooltip="{ content: 'Installed version', placement: 'bottom' }"
    :label="project.version"
    icon="rocket" />

  <!-- Updated -->
  <MenuItem
    v-else-if="!updater.available"
    :label="`${project.name} is up to date!`"
    :description="project.version"
    icon="thumbs-up"
    :is-link="true"
    @click="next" />

  <!-- Update available -->
  <MenuItem
    v-else
    :label="`${project.name} ${updater.latest.tag_name} available.`"
    icon="fire-alt"
    class="update-item"
    :is-link="true"
    @click="next" />
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },

    href: {
      type: String,
      required: true,
    },
  },

  computed: {
    updater() {
      return this.project.updater
    },
  },

  methods: {
    next() {
      this.$router.push(`${this.href}?forced=true`)
    },
  },
}
</script>

<style lang="scss">
@keyframes updateAnim {
  0% {
    @apply bg-transparent;
  }

  50% {
    @apply bg-primary-dark;
  }

  100% {
    @apply bg-transparent;
  }
}

.update-item {
  //transition: all 0.2s ease-in-out;
  animation-name: updateAnim;
  animation-duration: 2s;
  animation-iteration-count: infinite;

  &:hover {
    animation-name: none;
    background: theme('colors.dark.300') !important;
  }

  .item__label {
    @apply text-white;
  }

  .item__description {
  }
}
</style>
