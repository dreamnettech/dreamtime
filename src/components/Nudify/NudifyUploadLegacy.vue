<template>
  <div class="uploader">
    <!-- Menu -->
    <portal to="menu">
      <section class="menu__items">
        <MenuItem
          label="File"
          icon="file"
          :is-link="true"
          :class="{'item--active': selectionId === 2}"
          @click="selectionId = 2" />

        <MenuItem
          label="Folder"
          icon="folder-open"
          :is-link="true"
          :class="{'item--active': selectionId === 3}"
          @click="selectionId = 3" />
      </section>

      <section class="menu__items">
        <MenuItem
          label="Instagram"
          :icon="['fab', 'instagram']"
          :is-link="true"
          :class="{'item--active': selectionId === 1}"
          @click="selectionId = 1" />

        <MenuItem
          label="Web"
          icon="globe"
          :is-link="true"
          :class="{'item--active': selectionId === 0}"
          @click="selectionId = 0" />
      </section>

      <section class="menu__items">
        <MenuItem
          label="YouTube"
          :icon="['fab', 'youtube']"
          :is-link="true"
          :class="{'item--active': selectionId === 4}"
          @click="selectionId = 4" />

        <MenuItem
          label="Giphy"
          icon="https://unpkg.com/simple-icons@v4/icons/giphy.svg"
          :is-link="true"
          :class="{'item--active': selectionId === 5}"
          @click="selectionId = 5" />
      </section>

      <section class="menu__items">
        <MenuItem
          label="4chan"
          icon="leaf"
          :is-link="true"
          :class="{'item--active': selectionId === 6}"
          @click="selectionId = 6" />
      </section>
    </portal>

    <!-- Global alert -->
    <AppNotification v-if="alert && alert.message" :name="alert.id" :color="alert.color">
      <h5>
        <font-awesome-icon icon="exclamation-triangle" />
        {{ alert.title || 'ALERT' }}
      </h5>
      <div v-html="alert.message" />
    </AppNotification>

    <!-- DreamTime Updater -->
    <AppNotification v-if="dreamtime.available"
                     :name="`update-dreamtime-${dreamtime.latest.tag_name}`"
                     class="cursor-pointer"
                     @click="$router.push('/wizard/dreamtime')">
      🎉 <strong>{{ $dream.name }} {{ dreamtime.latest.tag_name }}</strong> is available! Click here to update.
    </AppNotification>

    <!-- DreamPower Updater -->
    <AppNotification v-if="dreampower.available"
                     :name="`update-dreampower-${dreampower.latest.tag_name}`"
                     class="cursor-pointer"
                     @click="$router.push('/wizard/power')">
      🎉 <strong>{{ dreampower.displayName }} {{ dreampower.latest.tag_name }}</strong> is available! Click here to update.
    </AppNotification>

    <!-- Checkpoints Updater -->
    <AppNotification v-if="checkpoints.available"
                     class="notification notification--warning cursor-pointer"
                     :name="`update-checkpoints-${checkpoints.latest.tag_name}`"
                     @click="$router.push('/wizard/checkpoints')">
      🎉 <strong>{{ checkpoints.displayName }} {{ checkpoints.latest.tag_name }}</strong> is available! Click here to update.
    </AppNotification>

    <div class="uploader__methods">
      <!-- Web Address -->
      <UploaderWeb v-show="selectionId === 0" />

      <!-- Instagram -->
      <UploaderProvider
        v-show="selectionId === 1"
        provider="Instagram"
        subtitle="Open public photos and videos from Instagram."
        :icon="['fab', 'instagram']"
        placeholder="https://www.instagram.com/p/"
        note="Make sure the profile is public and you are not using a VPN/Proxy."
        note-tooltip="Instagram usually blocks access to public photos if you are using a VPN/Proxy." />

      <!-- File -->
      <UploaderFile v-show="selectionId === 2" />

      <!-- Folder -->
      <UploaderFolder v-show="selectionId === 3" />

      <!-- YouTube -->
      <UploaderProvider
        v-show="selectionId === 4"
        provider="YouTube"
        subtitle="Open public videos from YouTube."
        :icon="['fab', 'youtube']"
        placeholder="https://www.youtube.com/watch?v="
        note="Make sure the video is public and you are not using a VPN/Proxy."
        note-tooltip="YouTube usually blocks access to public videos if you are using a VPN/Proxy." />

      <!-- Giphy -->
      <UploaderProvider
        v-show="selectionId === 5"
        provider="Giphy"
        subtitle="Open public GIFs from Giphy."
        :icon="['fab', 'youtube']"
        placeholder="https://giphy.com/gifs/" />

      <!-- 4chan -->
      <UploaderProvider
        v-show="selectionId === 6"
        provider="FourChan"
        title="4chan"
        subtitle="Open a thread and select the photos to nudify."
        icon="leaf"
        placeholder="https://boards.4chan.org/r/thread/"
        :watch="true" />
    </div>
  </div>
</template>

<script>
import {
  isEmpty, map, toNumber, startsWith,
} from 'lodash'
import fs from 'fs-extra'
import ytdl from 'ytdl-core'
import { GiphyFetch } from '@giphy/js-fetch-api'
import Swal from 'sweetalert2/src/sweetalert2'
import { dreamtrack } from '~/modules/services'
import { dreamtime, dreampower, checkpoints } from '~/modules/updater'
import { Nudify } from '~/modules/nudify'
import { tutorial, File } from '~/modules'
import { UploadMixin } from '~/mixins'

const { instagram } = $provider
const { getPath } = $provider.paths
const gf = new GiphyFetch('dc6zaTOxFJmzC')

export default {
  mixins: [UploadMixin],

  data: () => ({
    selectionId: 1,
    webAddress: '',
    instagramPhoto: '',
    youtubeURL: '',
    giphyURL: '',

    dreamtime,
    dreampower,
    checkpoints,
  }),

  computed: {
    alert() {
      return dreamtrack.get('alert')
    },
  },

  watch: {
    selectionId(value) {
      localStorage.uploadSelectionId = value
    },
  },

  created() {
    this.selectionId = localStorage.uploadSelectionId || 1
    this.selectionId = toNumber(this.selectionId)
  },

  mounted() {
    tutorial.upload()
  },

  methods: {
    /**
     *
     */
    openFile(event) {
      const { files } = event.target

      if (files.length === 0) {
        return
      }

      const paths = map(files, 'path')

      this.addFiles(paths)

      consola.track('UPLOAD_FILE')

      event.target.value = ''
    },

    /**
     *
     */
    openUrl() {
      if (isEmpty(this.webAddress) || (!startsWith(this.webAddress, 'http://') && !startsWith(this.webAddress, 'https://'))) {
        throw new Warning('Upload failed.', 'Please enter a valid web address.')
      }

      Nudify.addUrl(this.webAddress)

      consola.track('UPLOAD_URL')

      this.webAddress = ''
    },

    /**
     *
     */
    async openInstagramPhoto() {
      if (isEmpty(this.instagramPhoto)) {
        throw new Warning('Upload failed.', 'Please enter a valid Instagram photo.')
      }

      let post

      try {
        post = await instagram.getPost(this.instagramPhoto)
      } catch (error) {
        throw new Warning(
          'Upload failed.',
          'Unable to download the photo, please verify that the address is correct and that you are connected to the Internet.',
          error,
        )
      }

      Nudify.addUrl(post.downloadUrl)

      consola.track('UPLOAD_INSTAGRAM')

      this.instagramPhoto = ''
    },

    async openYoutube() {
      if (isEmpty(this.youtubeURL) || !ytdl.validateURL(this.youtubeURL)) {
        throw new Warning('Upload failed.', 'Please enter a valid YouTube URL.')
      }

      const videoID = ytdl.getURLVideoID(this.youtubeURL)
      const file = await File.fromPath(getPath('downloads', `${videoID}.mp4`))

      if (!file.exists) {
        await new Promise((resolve) => {
          const video = ytdl(this.youtubeURL)
            .pipe(fs.createWriteStream(file.path))
            .on('finish', resolve)

          // eslint-disable-next-line promise/catch-or-return
          Swal.fire({
            title: 'Downloading...',
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen() {
              Swal.showLoading()
            },
          }).then((result) => {
            // eslint-disable-next-line promise/always-return
            if (result.isDismissed && result.dismiss === 'cancel') {
              video.destroy()
              file.unlink()
              resolve()
            }
          })
        })
      }

      if (file.exists) {
        Swal.close()
        Nudify.add(file)

        consola.track('UPLOAD_YOUTUBE')
        this.youtubeURL = ''
      }
    },

    async openGiphy() {
      if (isEmpty(this.giphyURL)) {
        throw new Warning('Upload failed.', 'Please enter a valid Giphy URL.')
      }

      const giphyID = this.giphyURL.split('/').reverse()[0].split('-').reverse()[0]

      const { data } = await gf.gif(giphyID)

      Nudify.addUrl(data.images.original.mp4, { filename: `${giphyID}.mp4` })

      consola.track('UPLOAD_GIPHY')
      this.giphyURL = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.uploader {
}

.uploader__methods {
  @apply flex-1;
}

.method__header {
  @apply mb-9;

  .title {
    @apply text-lg font-semibold text-snow-light;

    .icon {
      @apply mr-2;
    }
  }

  .subtitle {
    @apply font-light mb-6;

    .help {
      @apply ml-2;
      cursor: help;
    }
  }
}

.method__body {
  @apply text-center;

  .input {
    @apply mb-3;
  }

  .button:not(:last-child) {
    @apply mb-6;
  }
}

.method__note {
  @apply text-xs block text-snow-darker;
}
</style>
