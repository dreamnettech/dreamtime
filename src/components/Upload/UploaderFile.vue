<template>
  <div class="uploader">
    <PageHeader>
      <h2 class="title">
        <span class="icon"><FontAwesomeIcon icon="file" /></span>
        <span>File</span>
      </h2>

      <h3 class="subtitle">
        Open files from your computer.
      </h3>
    </PageHeader>

    <!-- Hidden Input -->
    <input
      v-show="false"
      ref="photo"
      type="file"
      accept="image/jpeg, image/png, image/gif, video/mp4, video/webm"
      multiple
      @change="open">

    <AppBox class="uploader__body">
      <button class="button button--primary" @click.prevent="$refs.photo.click()">
        <span>OPEN</span>
      </button>

      <span class="note">PNG, JPG, GIF, MP4 and WEBM files only.</span>
      <span class="note">Remember that you can drag & drop the files.</span>
    </AppBox>
  </div>
</template>

<script>
import { map } from 'lodash'
import { UploadMixin } from '~/mixins'

export default {
  mixins: [UploadMixin],

  methods: {
    open(event) {
      const { files } = event.target

      if (files.length === 0) {
        return
      }

      const paths = map(files, 'path')

      this.addFiles(paths)

      consola.track('UPLOAD_FILE')

      event.target.value = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.uploader__body {
  @apply text-center;

  .input {
    @apply mb-3;
  }

  .button:not(:last-child) {
    @apply mb-3;
  }
}

.note {
  @apply block text-xs text-snow-darker;
}
</style>
