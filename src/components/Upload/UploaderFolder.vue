<template>
  <div class="uploader">
    <PageHeader>
      <h2 class="title">
        <span class="icon"><FontAwesomeIcon icon="folder" /></span>
        <span>Folder</span>
      </h2>

      <h3 class="subtitle">
        Open files from a folder on your computer.
      </h3>
    </PageHeader>

    <AppBox class="uploader__body">
      <button class="button button--primary" @click="openFolder">
        <span>OPEN FOLDER</span>
      </button>

      <span class="note">Remember that you can drag & drop the folder.</span>
    </AppBox>
  </div>
</template>

<script>
import { UploadMixin } from '~/mixins'

export default {
  mixins: [UploadMixin],
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
