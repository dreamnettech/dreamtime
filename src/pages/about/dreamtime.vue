<template>
  <div class="project">
    <!-- Stats -->
    <AppStats />

    <div class="project__content">
      <div class="box">
        <div class="box__header">
          <div class="left">
            <h1 class="title">
              {{ $dreamtime.name }}
            </h1>
            <h2 class="subtitle">
              {{ $dreamtime.description }}
            </h2>
          </div>

          <div class="right buttons">
            <button v-tooltip="'Application folder.'" class="button" @click="$dreamtime.openAppFolder()">
              <FontAwesomeIcon icon="folder-open" />
            </button>

            <nuxt-link v-tooltip="'Help & Tips.'" to="/help" class="button button--info">
              <FontAwesomeIcon icon="question-circle" />
            </nuxt-link>
          </div>
        </div>

        <div class="box__content">
          <!-- Updater -->
          <AppUpdate :project="$dreamtime" href="/wizard/dreamtime" />

          <!-- Remote navigation -->
          <MenuItem
            v-for="(item, index) in $dreamtime.data.about.navigation"
            :key="index"
            :label="item.label"
            :description="item.description"
            :icon="item.icon"
            :href="item.href" />
        </div>
      </div>

      <ProjectChangelog project="dreamtime" />
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
