<template>
  <div class="uploader">
    <PageHeader>
      <h2 class="title">
        <span v-if="icon" class="icon"><FontAwesomeIcon :icon="icon" /></span>
        <span>{{ title || provider }}</span>
      </h2>

      <h3 v-if="subtitle" class="subtitle">
        {{ subtitle }}
      </h3>
    </PageHeader>

    <AppBox class="uploader__body">
      <input v-model="url"
             type="url"
             class="input mb-2"
             :placeholder="placeholder"
             data-private="lipsum"
             :disabled="watching">

      <button v-if="!watching" class="button button--primary" @click="open">
        <span v-if="!watch">OPEN</span>
        <span v-else>WATCH</span>
      </button>

      <button v-else
              v-tooltip="`You are watching for new files on ${ title || provider }, they will automatically appear below. Exiting this section will stop the process.`"
              class="button button--danger"
              @click="watchStop">
        <span>STOP</span>
      </button>

      <span v-if="note" class="note">
        {{ note }} <AppTip class="ml-2" :tooltip="noteTooltip" />
      </span>
    </AppBox>

    <AppBox v-if="files.length > 0" title="Select the files to be added.">
      <div class="uploader__files">
        <div v-for="(file, it) of files" :key="it" class="uploader__file">
          <img :key="file.source" :src="file.source" loading="lazy">

          <div class="uploader__file__actions">
            <button v-tippy="'Add file'" class="button button--primary button--xl" @click="download(file)">
              <FontAwesomeIcon icon="plus-circle" />
            </button>
          </div>
        </div>
      </div>
    </AppBox>

    <DialogLoading ref="loading" />
    <LazyDialogFileDownloader ref="downloader" :provider="title" />
  </div>
</template>

<script>
import { remote } from 'electron'
import { filter, findIndex } from 'lodash'

/** @type {import('@dreamnet/downloader')} */
const providers = remote.require('@dreamnet/downloader')

export default {
  props: {
    provider: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    icon: {
      type: [String, Array],
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    watch: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      default: null,
    },
    noteTooltip: {
      type: [String, Object],
      default: null,
    },
  },

  data: () => ({
    url: '',
    files: [],
    instance: null,
    watchIndex: -1,
  }),

  computed: {
    watching() {
      return this.watchIndex > -1
    },
    storedURL: {
      get() {
        return localStorage.getItem(`uploader.${this.provider}.url`)
      },
      set(value) {
        if (!value) {
          localStorage.removeItem(`uploader.${this.provider}.url`)
        } else {
          localStorage.setItem(`uploader.${this.provider}.url`, value)
        }
      },
    },
  },

  created() {
    this.instance = providers[this.provider]
  },

  mounted() {
    if (this.storedURL) {
      this.url = this.storedURL
      this.open()
    }
  },

  beforeDestroy() {
    this.watchStop(false)
  },

  methods: {
    async open() {
      this.files = []

      this.$refs.loading.open()

      try {
        await this.fetch()

        if (!this.watch) {
          this.url = ''
          this.storedURL = undefined
        } else {
          this.watchIndex = setInterval(this.watchStart.bind(this), 10000)
          this.storedURL = this.url
        }
      } catch (err) {
        throw new Warning(
          'Upload failed.',
          err.message,
          err,
        )
      } finally {
        this.$refs.loading.close()
      }
    },

    async fetch() {
      const files = await this.instance.fetch(this.url)

      if (files.length === 0) {
        throw new Error('Unable to fetch files: Please make sure the URL is valid.')
      }

      this.add(files)
    },

    async watchStart() {
      try {
        await this.fetch()
      } catch (err) {
        this.watchStop()

        throw new Warning(
          'Watch failed.',
          err.message,
          err,
        )
      }
    },

    watchStop(clearStored = true) {
      if (this.watchIndex >= 0) {
        clearInterval(this.watchIndex)
        this.watchIndex = -1
      }

      if (clearStored) {
        this.storedURL = undefined
      }
    },

    download(file) {
      this.$refs.downloader.open(file)
    },

    add(files) {
      if (files.length === 1) {
        this.download(files[0])
        return
      }

      files = files.reverse()

      if (!this.watch || this.files.length === 0) {
        this.files = files
        return
      }

      files = filter(files, (file) => {
        const index = findIndex(this.files, { source: file.source })
        return index === -1
      })

      this.files.unshift(...files)
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

.uploader__files {
  @apply grid grid-cols-3 gap-6 overflow-y-auto;
  max-height: 600px;
}

.uploader__file {
  @apply relative;
  @include transition('box-shadow');
  min-height: 150px;

  &:hover {
    @apply shadow-lg;

    .uploader__file__actions {
      @apply opacity-100;
    }
  }

  img {
    @apply rounded;
  }
}

.uploader__file__actions {
  @apply absolute top-0 bottom-0 left-0 right-0 z-10;
  @apply bg-menus-dark-80 opacity-0;
  @apply flex justify-center items-center;
  @include transition('opacity');
  backdrop-filter: blur(4px);
}

.note {
  @apply block text-xs text-snow-darker;
}
</style>
