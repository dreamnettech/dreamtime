<template>
  <div class="community">
    <div class="community__content">
      <div class="box box--community">
        <div class="box__photo">
          <video src="~/assets/videos/dreamnet.mp4"
                 autoplay
                 muted
                 loop />
        </div>

        <div class="box__header">
          <h1 class="title">
            {{ $community.name }}
          </h1>
          <h2 class="subtitle">
            {{ $community.slogan }}
          </h2>
        </div>

        <div class="box__content">
          <!-- Remote navigation -->
          <MenuItem
            v-for="(item, index) in $community.data.navigation"
            :key="index"
            :label="item.label"
            :description="item.description"
            :icon="item.icon"
            :href="item.href" />
        </div>
      </div>

      <div class="community__sections">
        <div
          v-for="(section, index) in $community.data.sections"
          :key="index"
          class="box">
          <div class="box__header">
            <h2 class="title">
              {{ section.title }}
            </h2>
          </div>

          <div v-if="typeof section.content === 'object'" class="box__content">
            <MenuItem
              v-for="(item, it) in section.content"
              :key="it"
              :label="item.label"
              :description="item.description"
              :icon="item.icon"
              :href="item.href" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.community {

}

.community__content {

}

.community__sections {
  @apply grid grid-cols-2 gap-x-6;
}

.box--community {
  .title {
    @apply text-lg;
  }
}

.box__photo {
  @apply relative overflow-hidden;
  height: 150px;

  video {
    @apply absolute right-0 bottom-0 h-full w-full overflow-hidden;
    object-fit: cover;
  }
}
</style>
