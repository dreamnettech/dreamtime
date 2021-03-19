<template>
  <div class="box run" :class="previewClass">
    <!-- Preview -->
    <div class="box__photo run__photo">
      <video v-if="isVideo && file.exists"
             :src="file.url"
             class="run__video__preview"
             autoplay
             muted
             loop
             data-private
             @click="openPreview" />

      <div v-else-if="run.photo.file.isAnimated && run.framePath"
           class="run__photo__preview"
           :style="{ backgroundImage: `url('${run.framePath}')` }"
           data-private />

      <div v-else-if="file.exists"
           class="run__photo__preview"
           :style="{ backgroundImage: `url('${file.url}')` }"
           data-private
           @click="openPreview" />

      <div v-if="run.running" class="run__photo__status">
        <p>
          <span :key="`algo-active-${run.algorithmActive}`" v-tooltip="run.algorithmActiveTooltip" class="algorithm">{{ run.algorithmActiveLabel }}</span>
          <span :key="`algo-status-${run.algorithmStatus}`" v-tooltip="run.algorithmStatusTooltip" class="status">{{ run.algorithmStatusLabel }}</span>
        </p>

        <span v-if="run.frameCurrent" v-tooltip="'Video frame.'">{{ run.frameCurrent }}/{{ run.frameTotal }}</span>
      </div>
    </div>

    <!-- Preferences -->
    <div
      v-if="run.preferences.body.runs.mode !== false"
      class="run__preferences">
      <div class="preference">
        <span>Boobs</span>
        <span>{{ run.preferences.body.boobs.size | fixedValue }}</span>
      </div>

      <div class="preference">
        <span>Areola</span>
        <span>{{ run.preferences.body.areola.size | fixedValue }}</span>
      </div>

      <div class="preference">
        <span>Nipple</span>
        <span>{{ run.preferences.body.nipple.size | fixedValue }}</span>
      </div>

      <div class="preference">
        <span>Vagina</span>
        <span>{{ run.preferences.body.vagina.size | fixedValue }}</span>
      </div>

      <div class="preference">
        <span>Pubic hair</span>
        <span>{{ run.preferences.body.pubicHair.size | fixedValue }}</span>
      </div>
    </div>

    <!-- Buttons -->
    <div class="box__footer buttons">
      <div v-if="run.running" key="button-status" class="button button--sm">
        <span class="icon">
          <font-awesome-icon icon="running" />
        </span>
        <span>{{ run.timer.duration }}s</span>
      </div>

      <div v-else-if="run.failed" key="button-status" class="button button--danger button--sm">
        <span class="icon">
          <font-awesome-icon icon="exclamation-triangle" />
        </span>
        <span>Error!</span>
      </div>

      <div v-else-if="run.finished" key="button-status" class="button button--sm">
        <span class="icon">
          <font-awesome-icon icon="heart" />
        </span>
        <span>{{ run.timer.duration }}s</span>
      </div>

      <div v-else key="button-status" class="button button--sm">
        <span>
          <font-awesome-icon icon="clock" />
        </span>
      </div>

      <button
        key="button-terminal"
        v-tooltip="'View terminal'"
        class="button button--sm"
        @click.prevent="$refs.terminalDialog.showModal()">
        <font-awesome-icon icon="terminal" />
      </button>

      <button
        v-if="run.successful && run.preferences.advanced.useClothTransparencyEffect"
        key="button-transparency"
        v-tooltip="'X-Ray Tool'"
        class="button button--primary button--sm"
        @click="$refs.xrayDialog.open()">
        <span class="icon">
          <font-awesome-icon icon="hat-wizard" />
        </span>
      </button>

      <button
        v-if="run.successful"
        key="button-save"
        v-tooltip="'Save'"
        class="button button--success button--sm"
        @click.prevent="save">
        <span class="icon">
          <font-awesome-icon icon="save" />
        </span>
      </button>

      <button v-if="run.finished"
              key="button-rerun"
              v-tooltip="'Rerun'"
              class="button button--info button--sm"
              @click.prevent="rerun">
        <span class="icon">
          <font-awesome-icon icon="retweet" />
        </span>
      </button>

      <button v-if="run.running"
              key="button-stop"
              v-tooltip="'Stop'"
              class="button button--danger button--sm"
              @click.prevent="cancel">
        <font-awesome-icon icon="stop" />
      </button>
    </div>

    <!-- Terminal Dialog -->
    <dialog ref="terminalDialog">
      <AppBox title="Terminal" subtitle="Take a closer look at what the algorithm is doing.">
        <div class="terminal">
          <li
            v-for="(item, index) in run.cli.lines"
            :key="index"
            :class="item.css">
            > {{ item.text }}
          </li>
        </div>

        <template #footer>
          <div class="box__footer buttons">
            <button class="button button--danger" @click="$refs.terminalDialog.close()">
              Close
            </button>
          </div>
        </template>
      </AppBox>
    </dialog>

    <!-- X-Ray tool -->
    <LazyDialogXRay v-if="run.successful && run.preferences.advanced.useClothTransparencyEffect"
                    ref="xrayDialog"
                    :cloth-file="clothFile"
                    :nude-file="run.outputFile"
                    :output-name="run.outputName"
                    :image-size="run.photo.imageSize" />
  </div>
</template>

<script>
import { Nudify } from '~/modules/nudify'
import { ALGORITHM } from '~/modules/nudify/photo-run'
import { STEP } from '~/modules/nudify/photo-mask'

export default {
  filters: {
    /*
    size(value) {
      return Number.parseFloat(value).toFixed(2)
    },
    */

    fixedValue(value) {
      return Number(value).toFixed(2)
    },
  },

  props: {
    run: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    ALGORITHM,
  }),

  computed: {
    isVideo() {
      return this.run.photo.file.isVideo
    },

    file() {
      return this.run.outputFile
    },

    clothFile() {
      if (this.run.mask === STEP.PADDING || this.run.useColorPaddingRemoval) {
        return this.run.photo.file
      }

      if (!this.run.photo.masks.correct.file.exists) {
        return this.run.photo.file
      }

      return this.run.photo.masks.correct.file
    },

    previewClass() {
      return {
        'run--failed': this.run.failed,
        'run--running': this.run.running,
        'run--finished': this.run.finished,
      }
    },
  },

  methods: {
    save() {
      this.run.outputFile.save(this.run.outputName)
    },

    openPreview() {
      this.run.outputFile.openItem()
    },

    rerun() {
      this.run.add()
    },

    cancel() {
      this.run.cancel()
    },

    addMaskToQueue() {
      Nudify.add(this.run.maskfinFile, { isMaskfin: true })
    },

    saveMask() {
      this.run.maskfinFile.save(`maskfin-${this.run.outputName}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.run {
  @apply mb-0 relative border border-transparent;

  &.run--running {
    @apply border-primary;
  }

  &.run--failed {
    @apply border-danger;
  }

  &:hover {
    .run__preferences {
      @apply opacity-100;
    }
  }
}

.run__photo {
  background-image: url('~@/assets/images/carbon-fibre-v2.png');
  will-change: transform;
  height: 500px;
}

.run__photo__preview {
  @apply absolute top-0 bottom-0 left-0 right-0 z-10;
  @apply bg-contain bg-no-repeat bg-center;
  cursor: zoom-in;
}

.run__photo__status {
  @apply absolute z-20;
  @apply py-2 pr-6 pl-3 rounded-br rounded-tr;
  @apply flex gap-6 items-center;
  background-color: rgba(0, 0, 0, .8);
  backdrop-filter: blur(6px);
  left: 0;
  bottom: 40px;
  min-width: 160px;
  cursor: help;

  .algorithm {
    @apply block font-bold text-primary;
  }

  .status {
    @apply block text-sm;
  }
}

.run__video__preview {
  @apply h-full w-full overflow-hidden;
  cursor: zoom-in;
}

.run__preferences {
  @apply absolute top-0 z-20;
  @apply flex opacity-0 bg-menus bg-opacity-80 w-full;
  backdrop-filter: blur(6px);
  transition: opacity 0.1s linear;
  height: 80px;

  .preference {
    @apply flex flex-col flex-1 items-center justify-center;

    span {
      &:first-child {
        @apply text-xs;
      }

      &:last-child {
        @apply text-sm text-white font-bold;
      }
    }
  }
}

.buttons {
  @apply justify-end;

  .button {
    max-width: 100px;
  }
}

.terminal {
  @apply p-2 bg-black overflow-auto rounded;
  height: 400px;

  li {
    @apply font-mono text-white mb-3 block;
  }
}
</style>
