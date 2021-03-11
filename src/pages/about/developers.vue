<template>
  <div class="project">
    <div class="project__content">
      <!-- Developers -->
      <div class="box">
        <div class="box__header">
          <h1 class="title">
            Developers
          </h1>
          <h2 class="subtitle">
            Semi gods who have used their skills to create this incredible project.
          </h2>
        </div>

        <div class="box__content">
          <!-- Remote navigation -->
          <MenuItem
            v-for="(item, index) in developers"
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
    developers() {
      return this.$dreamtrack.get('developers', [])
    },
  },
}
</script>

<style lang="scss" scoped>
.project__content {
  .title {
    @apply text-lg;
  }
}

.box__content {
  @apply overflow-y-auto;
  max-height: 500px;
}
</style>
