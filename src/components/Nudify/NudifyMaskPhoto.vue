<template>
  <div class="box mask"
       :class="maskClass"
       @dragenter="onDragEnter"
       @dragover="onDragOver"
       @dragleave="onDragLeave"
       @drop="onDrop">
    <!-- Dragging -->
    <div class="mask__dropzone">
      <h2>Drop the {{ mask.title }} here!</h2>
    </div>

    <div class="box__photo mask__photo">
      <div v-if="file.exists"
           class="mask__photo__preview"
           :style="{ backgroundImage: `url('${mask.url}')` }"
           data-private
           @click="openPreview" />

      <div v-if="run && run.running" class="mask__photo__status">
        <p>
          <span :key="`algo-active-${run.algorithmActive}`" v-tooltip="run.algorithmActiveTooltip" class="algorithm">{{ run.algorithmActiveLabel }}</span>
          <span :key="`algo-status-${run.algorithmStatus}`" v-tooltip="run.algorithmStatusTooltip" class="status">{{ run.algorithmStatusLabel }}</span>
        </p>
      </div>
    </div>

    <div class="box__header">
      <span class="title">{{ mask.title }} <AppTip :tooltip="mask.description" /></span>
    </div>

    <input
      v-show="false"
      ref="photo"
      type="file"
      accept="image/png"
      @change="change">

    <div class="box__footer buttons">
      <button v-if="mask.canShowEdit"
              key="edit"
              v-tooltip="'Photo editor.'"
              class="button button--sm button--primary"
              @click="$refs.editor.open()">
        <FontAwesomeIcon icon="paint-brush" />
      </button>

      <button v-if="mask.canShowUpload"
              key="upload"
              v-tooltip="'Upload mask.'"
              class="button button--sm"
              @click="$refs.photo.click()">
        <FontAwesomeIcon icon="file-upload" />
      </button>

      <button v-if="mask.canShowSave"
              key="save"
              v-tooltip="'Save mask.'"
              class="button button--sm"
              @click="mask.save()">
        <FontAwesomeIcon icon="save" />
      </button>

      <button
        v-if="xRays && mask.canShowSave"
        key="button-transparency"
        v-tooltip="'X-Ray Tool'"
        class="button button--primary button--sm"
        @click="$refs.xray.open()">
        <span class="icon">
          <font-awesome-icon icon="hat-wizard" />
        </span>
      </button>

      <button v-if="mask.run"
              key="button-terminal"
              v-tooltip="'View terminal'"
              class="button button--sm"
              @click.prevent="$refs.terminalDialog.showModal()">
        <font-awesome-icon icon="terminal" />
      </button>

      <button v-if="mask.canShowGenerate && mask.photo.running"
              key="stop"
              v-tooltip="'Stop Generation.'"
              class="button button--danger button--sm"
              @click="stop()">
        <FontAwesomeIcon icon="stop" />
      </button>

      <button v-else-if="mask.canShowGenerate && mask.canShowSave"
              key="rerun"
              v-tooltip="'Rerun.'"
              class="button button--info button--sm"
              @click="generate()">
        <FontAwesomeIcon icon="retweet" />
      </button>

      <button v-else-if="mask.canShowGenerate && !mask.photo.running"
              key="play"
              v-tooltip="'Generate.'"
              class="button button--success button--sm"
              @click="generate()">
        <FontAwesomeIcon icon="play" />
      </button>

      <button v-else-if="mask.isReadOnly && mask.nextMask"
              key="play-disabled"
              v-tooltip="'This mask will be generated with the next.'"
              class="button button--success button--sm button--disabled">
        <FontAwesomeIcon icon="play" />
      </button>
    </div>

    <!-- Terminal Dialog -->
    <dialog v-if="mask.run" ref="terminalDialog">
      <AppBox title="Terminal" subtitle="Take a closer look at what the algorithm is doing.">
        <div class="terminal">
          <li
            v-for="(item, index) in mask.run.cli.lines"
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
    <LazyDialogXRay v-if="xRays && mask.canShowSave"
                    ref="xray"
                    :cloth-file="clothFile"
                    :nude-file="file"
                    :output-name="run.outputName"
                    :image-size="mask.photo.imageSize" />

    <!-- Editor tool -->
    <DialogEditor v-if="mask.canShowEdit"
                  ref="editor"
                  :file="file"
                  :output-file="file" />
  </div>
</template>

<script>
import { File } from '~/modules'
import { DragDropMixin } from '~/mixins'
import { STEP } from '~/modules/nudify/photo-mask'

export default {
  mixins: [DragDropMixin],

  props: {
    mask: {
      type: Object,
      required: true,
    },
    xRays: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
  }),

  computed: {
    file() {
      return this.mask.file
    },

    run() {
      return this.mask.run
    },

    maskClass() {
      return {
        'mask--dragging': this.isDragging,
        'mask--failed': this.mask.run?.failed,
        'mask--running': this.mask.run?.running,
        'mask--finished': this.mask.run?.finished,
      }
    },

    clothFile() {
      if (this.mask.id === STEP.NUDE) {
        return this.mask.photo.masks.correct.file
      }

      return this.mask.photo.file
    },
  },

  mounted() {
    if (this.mask.isReadOnly) {
      this.isDragEnabled = false
    }
  },

  methods: {
    async change(event) {
      const { files } = event.target

      if (files.length === 0) {
        return
      }

      try {
        const file = await File.fromPath(files[0].path, { watch: false })

        file.validateAs('image/png')

        this.file.writeFile(file)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error)
      }

      event.target.value = ''
    },

    async onURL(url) {
      try {
        const file = await File.fromUrl(url, { watch: false })

        file.validateAs('image/png')

        this.file.writeFile(file)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error)
      }
    },

    async onFiles(files) {
      try {
        const file = await File.fromPath(files[0].path, { watch: false })

        file.validateAs('image/png')

        this.file.writeFile(file)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error)
      }
    },

    generate() {
      this.mask.photo.generateMask(this.mask.id)
    },

    stop() {
      this.mask.photo.cancel()
    },

    openPreview() {
      this.mask.file.openItem()
    },
  },
}
</script>

<style lang="scss" scoped>
.mask {
  @apply mb-0 relative border-2 border-transparent;

  &.mask--dragging {
    .mask__dropzone {
      @apply flex opacity-100;
    }
  }

  &.mask--running {
    @apply border-primary;
  }

  &.mask--failed {
    @apply border-danger;
  }
}

.mask__dropzone {
  @apply absolute left-0 right-0 top-0 bottom-0 z-50;
  @apply bg-menus-dark bg-opacity-80 items-center justify-center;
  @apply hidden opacity-0 pointer-events-none;
  backdrop-filter: blur(6px);
  transition: opacity 0.2s ease-in-out;
  will-change: opacity;

  h2 {
    @apply text-white font-bold text-xl;
  }
}

.mask__photo {
  background-image: url('~@/assets/images/cubes.png');
  will-change: transform;
  height: 350px;
}

.mask__photo__preview {
  @apply absolute top-0 bottom-0 left-0 right-0 z-10;
  @apply bg-contain bg-no-repeat bg-center;
  cursor: zoom-in;
}

.mask__photo__status {
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

.box__header {
  @apply pb-3;

  .tip {
    @apply ml-2;
  }
}

.buttons {
  @apply justify-end;

  .button {
    max-width: 90px;
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
