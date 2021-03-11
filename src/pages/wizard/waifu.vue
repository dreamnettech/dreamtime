<template>
  <div class="wizard-project">
    <PageHeader>
      <h2 class="title">
        <span class="icon"><font-awesome-icon icon="sync" /></span>
        <span>Updater</span>
      </h2>

      <h3 class="subtitle">
        Optional algorithm to upscale photos.
      </h3>

      <template #right>
        <button v-if="requirements.waifu.installed && requirements.waifu.compatible" class="button" @click="$router.replace('/')">
          <span class="icon"><font-awesome-icon icon="caret-left" /></span>
          <span>Go back</span>
        </button>

        <button v-if="!requirements.waifu.installed" class="button button--primary" @click="skip">
          <span>Skip</span>
        </button>

        <button class="button" @click="$dreamtime.openAppDataFolder()">
          <span class="icon"><font-awesome-icon icon="folder-open" /></span>
          <span>{{ $dreamtime.name }} Folder</span>
        </button>
      </template>
    </PageHeader>

    <div class="project__content">
      <!-- INTERNAL ERROR! -->
      <div v-if="requirements.waifu.error" class="notification notification--danger">
        <h5>
          <span class="icon"><font-awesome-icon icon="exclamation-triangle" /></span>
          <span>INTERNAL ERROR!</span>
        </h5>

        {{ $dreamtime.name }} has not been able to verify that {{ $waifu.name }} works correctly, please fix this issue before continuing. Visit <a href="#" target="_blank">the website</a> with the most common problems or our <a href="https://chat.dreamnet.tech" target="_blank">chat</a> for technical support.
        <br><br>

        <pre>{{ requirements.waifu.error.stack }}</pre>
      </div>

      <!-- OUTDATED -->
      <div v-else-if="requirements.waifu.installed && !requirements.waifu.compatible" class="notification notification--danger">
        <h5>
          <span class="icon"><font-awesome-icon icon="exclamation-triangle" /></span>
          <span>OUTDATED</span>
        </h5>
        To continue please install the update for this component.
      </div>

      <!-- Installed version -->
      <div v-if="$waifu.version" class="notification">
        Installed version: <strong class="text-primary">{{ $waifu.version }}</strong>
      </div>

      <!-- Macos -->
      <div v-if="isMacOS" class="notification notification--warning">
        You may need to run the command <code>brew install openblas</code> before using Waifu2X.
      </div>

      <!-- Windows -->
      <div v-if="$settings.preferences.advanced.device === 'GPU'" class="notification notification--warning">
        <h5>
          <span class="icon"><font-awesome-icon icon="exclamation-triangle" /></span>
          <span>Waifu2X require CUDA 10.2</span>
        </h5>
        Before using Waifu2X on GPU please <a href="https://developer.nvidia.com/cuda-10.2-download-archive" target="_blank">download and install CUDA 10.2</a>
      </div>

      <!-- CONNECTION ERROR! -->
      <div v-if="updater.error" class="notification notification--danger">
        <h5>
          <span class="icon"><font-awesome-icon icon="exclamation-triangle" /></span>
          <span>CONNECTION ERROR!</span>
        </h5>
        <span>A problem has occurred when trying to get the information from Github, please make sure you have a stable internet connection and restart the application.</span>
        <br><br>

        <pre>
<span v-if="updater.errorResponse">{{ updater.errorResponse }}</span>
{{ updater.error.stack }}
</pre>
      </div>

      <AppBox>
        <ProjectUpdate project="waifu" />
      </AppBox>

      <AppBox title="Settings.">
        <!-- Download protocol. -->
        <MenuItem
          v-if="updater.hasTorrentUrls || updater.hasIPFSUrls"
          label="Download protocol."
          tooltip="- **Any:** Use all protocols if necessary.

- **HTTP:** Fastest and most reliable.

- **Torrent & IPFS:** Download the file from other computers with the option to cancel at any time and resume later. More reliable for unstable and low speed connections. May require a few minutes of preparation before starting the download.">
          <template #description>
            <span class="item__description">Protocol that will be used to download the file.</span>
          </template>

          <select v-model="updater.downloadMethod" class="input">
            <option :value="0">
              Any
            </option>

            <option :value="1">
              HTTP
            </option>

            <option v-if="updater.hasTorrentUrls" :value="3">
              Torrent
            </option>

            <option v-if="updater.hasIPFSUrls" :value="2">
              IPFS
            </option>
          </select>
        </MenuItem>

        <SettingsField v-if="!$dreamtime.isPortable" label="Location" field-id="folders.waifu">
          <input
            v-model="$settings.folders.waifu"
            readonly
            class="input"
            title="Change"
            @click="changeWaifu">
        </SettingsField>
      </AppBox>

      <!-- Changelog -->
      <ProjectChangelog project="waifu" :limit="1" />
    </div>
  </div>
</template>

<script>
import { isNil } from 'lodash'
import { requirements } from '~/modules/system'
import { waifu } from '~/modules/projects'

const { dialog } = $provider.api
const { existsSync } = $provider.fs

export default {
  layout: 'wizard',

  middleware({ redirect, route }) {
    if (!route.query.forced) {
      if (requirements.waifu.installed && requirements.waifu.compatible && !waifu.updater.available) {
        redirect('/wizard/telemetry')
      }
    }
  },

  data: () => ({
    requirements,
  }),

  computed: {
    isMacOS() {
      return process.platform === 'darwin'
    },

    updater() {
      return waifu.updater
    },
  },

  methods: {
    showOpenDialog(path) {
      const dir = dialog.showOpenDialogSync({
        defaultPath: path,
        properties: ['openDirectory'],
      })

      if (isNil(dir)) {
        return path
      }

      if (!existsSync(dir[0])) {
        // ???
        return path
      }

      return dir[0]
    },

    changeWaifu() {
      const dir = this.showOpenDialog(this.$settings.folders.waifu)
      this.$settings.folders.waifu = dir
    },

    skip() {
      this.$settings.wizard.waifu = true
      this.$router.push('/wizard/telemetry')
    },
  },
}
</script>
