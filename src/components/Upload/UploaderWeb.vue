<template>
  <div class="uploader">
    <PageHeader>
      <h2 class="title">
        <span class="icon"><FontAwesomeIcon icon="globe" /></span>
        <span>Web</span>
      </h2>

      <h3 class="subtitle">
        Open photos and videos from the web.
      </h3>
    </PageHeader>

    <AppBox class="uploader__body">
      <input v-model="url"
             type="url"
             class="input"
             placeholder="https://"
             data-private="lipsum">

      <button class="button button--primary" @click="open">
        <span>OPEN</span>
      </button>

      <span class="note">PNG, JPG, GIF, MP4 and WEBM files only.</span>
      <span class="note">Remember that you can drag & drop the files from your web browser.</span>
    </AppBox>

    <LazyDialogFileDownloader ref="downloader" provider="Web" />
  </div>
</template>

<script>
import { remote } from 'electron'
import { map } from 'lodash'
import { UploadMixin } from '~/mixins'

/** @type {import('@dreamnet/downloader')} */
const { Http } = remote.require('@dreamnet/downloader')

export default {
  mixins: [UploadMixin],

  data: () => ({
    url: '',
  }),

  methods: {
    async open() {
      try {
        const file = Http.create(this.url)
        await this.$refs.downloader.open(file)
        this.url = ''
      } catch (err) {
        throw new Warning(
          'Upload failed.',
          err.message,
          err,
        )
      }
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
