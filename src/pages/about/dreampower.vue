<template>
  <div class="project">
    <div class="project__content">
      <div class="box">
        <div class="box__header">
          <div class="left">
            <h1 class="title">
              {{ $dreampower.name }}
            </h1>
            <h2 class="subtitle">
              {{ $dreampower.description }}
            </h2>
          </div>

          <div class="right">
            <button v-tooltip="'Application folder.'" class="button" @click="$dreampower.openAppFolder()">
              <FontAwesomeIcon icon="folder-open" />
            </button>
          </div>
        </div>

        <div class="box__content">
          <!-- Updater -->
          <AppUpdate :project="$dreampower" href="/wizard/power" />

          <!-- Remote navigation -->
          <MenuItem
            v-for="(item, index) in $dreampower.data.about.navigation"
            :key="index"
            :label="item.label"
            :description="item.description"
            :icon="item.icon"
            :href="item.href" />
        </div>
      </div>

      <ProjectChangelog project="dreampower" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.project {

}

.project__content {
  .title {
    @apply text-lg;
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
</style>
